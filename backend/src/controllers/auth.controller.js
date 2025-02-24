import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import sendEmail from "../services/mail.service";
import { decodedToken, generateToken } from "../middleware/auth.middleware";

export const signUp = async (req, res) => {
  try {
    const { name, email, password, tel } = req.body;

    const hashPassword = await bcrypt.hash(password, 11);
    const user = await prisma.user.create({
      data: { name, email, hashPassword, tel },
    });

    const mailToken = generateToken({ id: user.id }, "1h");
    const url = `${process.env.BASE_URL}/auth/verify-mail?token=${mailToken}`;

    await sendEmail(email, url, name, url);

    res.status(200).json({
      message: "User created successfully. Please verify your email.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === "" || password === "") {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = generateToken({ id: user.id }, "1d");
        res.status(200).json({
          message: "Sign in successful.",
          token,
        });
      } else {
        res.status(400).json({ message: "Invalid email or password." });
      }
    } else {
      res.status(400).json({ message: "Invalid email or password." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const signOut = async (req, res) => {
    const token = req.headder("Authorization");
    try {
        if (!token) {
            return res.status(401).json({ message: "Access Denied. No token provided." });
        }
        const decoded = jwt.decode(token);
        if (!decoded) {
            return res.status(401).json({ message: "Invalid Token." });
        }
        const expiresAt = new Date(decoded.expiresAt * 1000);
        await prisma.blacklistedToken.create({data: {token, expiresAt}});
        res.status(200).json({ message: "Sign out successful." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "System Error" });
    }

}

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) {
      return res.status(400).json({ message: "Invalid token." });
    }
    const { userId } = decodedToken(token);
    await prisma.user.update({
      where: { id: userId },
      data: { isVerified: true },
    });
    res, status(200).json({ message: "Email verified successfully." });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "System Error" });
  }
};
