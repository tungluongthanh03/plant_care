import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


// get my information
export const me = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: { devices: true },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all users (just for testing)
export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({ include: { devices: true } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

