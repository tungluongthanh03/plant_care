import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// get my information
export const getDevices = async (req, res) => {
  const userId = req.user.id;
  try {
    const devices = await prisma.device.findMany({
      where: { userId: userId },
    });
    res.status(200).json({
      message: "Get devices successfully.",
      devices,
    });
  } catch (error) {}
};

// get all users (just for testing)
export const addDevice = async (req, res) => {
  try {
    const { name, type, threshold, userId, plantId } = req.body;
    const device = await prisma.device.create({
      data: {
        name,
        type,
        userId,
      },
    });
    res.status(200).json({
        message: "Add device successfully.",
        device,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "System Error" });
  }
};
