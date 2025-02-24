import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Middleware to authenticate user (nesessary for every action on FE)
const authenticate = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided." });
  }

  try {
    const blackToken = await prisma.blacklistedToken.findUnique({
      where: { token },
    });
    if (blackToken) {
      return res.status(401).json({ message: "Access Denied. Invalid Token." });
    }
    req.user = decodedToken(token); // Store user data in request object
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid token." });
  }
};

// Generate token for user after successful login
const generateToken = (payload, exp) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: exp,
  });
};

// Decode token to get user data
const decodedToken = (token) => {
  return jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
};

export { authenticate, generateToken, decodedToken };
