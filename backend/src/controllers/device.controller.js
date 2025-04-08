import { PrismaClient } from "@prisma/client";
import { client } from "../services/mqtt.service";
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
        log_working: true,
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
    const { name, type, threshold, userId } = req.body;
    const device = await prisma.device.create({
      data: {
        name,
        type,
        threshold,
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



export const turnOffDevice = async (req, res) => {
  const { deviceId } = req.params;
  try {
    const device = await prisma.device.findUnique({
      where: { id: deviceId },
    });
    if (!device) {
      return res.status(404).json({
        message: "Device not found.",
      });
    }
    client.publish(
      `${process.env.MQTT_USERNAME}/feeds/${deviceId.type}`, "0"
    );
    await prisma.device.update({
      where: { id: deviceId },
      data: {
        working: false,
      },
    });

    await prisma.log_working.create({
      data: {
        deviceId: deviceId,
        action: "OFF",
      },
    });
    res.status(200).json({
      message: "Turn off device successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "System Error" });
  }

}

export const turnOnDevice = async (req, res) => {
  const { deviceId } = req.params;
  try {
    const device = await prisma.device.findUnique({
      where: { id: deviceId },
    });
    if (!device) {
      return res.status(404).json({
        message: "Device not found.",
      });
    }
    client.publish(
      `${process.env.MQTT_USERNAME}/feeds/${device.type}`, "1"
    );
    await prisma.device.update({
      where: { id: deviceId },
      data: {
        working: true,
      },
    });

    await prisma.log_working.create({
      data: {
        deviceId: deviceId,
        action: "ON",
      },
    })
    res.status(200).json({
      message: "Turn off device successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "System Error" });
  }

}

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