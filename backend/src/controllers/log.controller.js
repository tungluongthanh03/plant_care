import { PrismaClient } from "@prisma/client";
import { client } from "../services/mqtt.service";
const prisma = new PrismaClient();

export const getLogsByDeviceId = async (req, res) => {
  const deviceId = req.params.deviceId;
  const userId = req.user.id;
  
  try {
    const device = await prisma.device.findFirst({
      where: {
        id: deviceId,
        userId: userId,
      },
    });
  
    if (!device) {
      return res
        .status(403)
        .json({ message: "Unauthorized to access this device." });
    }
    const logs = await prisma.log_working.findMany({
      where: { deviceId: deviceId },
    });
    res.status(200).json({
      message: "Get logs successfully.",
      logs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "System Error" });
  }
};

export const getAllLogs = async (req, res) => {
  const userId = req.user.id;
  try {
    const devices = await prisma.device.findMany({
      where: { userId: userId },
    });
    const logs = await prisma.log_working.findMany({
      where: { deviceId: { in: devices.map((device) => device.id) } },
    });
    res.status(200).json({
      message: "Get logs successfully.",
      logs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "System Error" });
  }
};
