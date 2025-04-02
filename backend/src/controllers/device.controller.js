import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// get my information
export const getDevices = async (req, res) => {
  const userId = req.user.id;
  try {
    const devices = await prisma.device.findMany({
      where: { userId: userId },
      include: {
        schedule: true,
      },
    });
    res.status(200).json({
      message: "Get devices successfully.",
      devices,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "System Error" });
  }
};

export const getDevice = async (req, res) => {
  const deviceId = req.params.id;
  const userId = req.user.id;
  try {
    const device = await prisma.device.findUnique({
      where: { id: deviceId, userId }, // Only get device if it belongs to the user
      include: {
        schedule: true,
      },
    });
    if (!device) {
      return res.status(404).json({
        message: "Device not found.",
      });
    }
    res.status(200).json({
      message: "Get device successfully.",
      device,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "System Error" });
  }
};

export const addDevice = async (req, res) => {
  try {
    const { name, type, threshold, userId, plantId } = req.body;
    const device = await prisma.device.create({
      data: {
        name,
        type,
        threshold,
        plantId,
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

export const updateDevice = async (req, res) => {
  const { deviceId, name, threshold } = req.body;
  try {
    const device = await prisma.device.findUnique({
      where: { id: deviceId },
    });
    if (!device) {
      return res.status(404).json({
        message: "Device not found.",
      });
    }
    await prisma.device.update({
      where: { id: deviceId },
      data: {
        name,
        threshold,
      },
    });
    res.status(200).json({
      message: "Update device successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "System Error" });
  }
};

export const deleteDevice = async (req, res) => {
  const deviceId = req.params.id;
  try {
    const device = await prisma.device.findUnique({
      where: { id: deviceId },
    });
    if (!device) {
      return res.status(404).json({
        message: "Device not found.",
      });
    }
    await prisma.device.delete({
      where: { id: deviceId },
    });
    res.status(200).json({
      message: "Delete device successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "System Error" });
  }
}