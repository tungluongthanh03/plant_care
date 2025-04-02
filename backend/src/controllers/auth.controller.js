import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {sendMail} from "../services/mail.service.js";
import { decodedToken, generateToken } from "../middleware/auth.middleware.js";

export const signUp = async (req, res) => {
  console.log(req.body);
  try {
    const { name, email, password, tel } = req.body;
    if (name === "" || email === "" || password === "" || tel === "") {
      return res.status(400).json({ message: "All fields are required." });
    }
    const sameUser = await prisma.user.findUnique({ where: { email } });
    if(sameUser) {
      return res.status(400).json({ message: "Email is already exits." });
    }

    const hashPassword = await bcrypt.hash(password, 11);
    console.log(hashPassword);
    const user = await prisma.user.create({
      data: { name, email, password: hashPassword, tel },
    });

    const mailToken = generateToken({ id: user.id }, "1h");
    const url = `${process.env.BASE_URL}/auth/verify-mail?token=${mailToken}`;

    await sendMail(email, "VERIFY EMAIL", name, url);

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
      if(user.isVerified === false) return res.status(401).json({ message: "Please verify your email." });
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
  console.log(req.header("Authorization"));
    const token = (req.header("Authorization")).split(" ")[1];
    try {
        if (!token) {
            return res.status(401).json({ message: "Access Denied. No token provided." });
        }
        const decoded = jwt.decode(token);
        if (!decoded) {
            return res.status(401).json({ message: "Invalid Token." });
        }
        const expiresAt = new Date(decoded.exp * 1000);
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
    console.log(decodedToken(token));
    const { id } = decodedToken(token);
    await prisma.user.update({
      where: { id: id },
      data: { isVerified: true },
    });
    res.status(200).json({ message: "Email verified successfully." });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "System Error" });
  }
};
