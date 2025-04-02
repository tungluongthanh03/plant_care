import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getSchedules = async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                devices: {
                    include: {
                        schedule: true
                    }
                }
            }
        });
        if(!user) {
            return res.status(404).json({
                message: "User not found."
            })
        }
        const schedules = user.devices;
        res.status(200).json({
            message: "Get schedules successfully.",
            schedules,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "System Error" });
    }
}

export const getSchedule = async (req, res) => {
    const deviceId = req.params.deviceId;
    const userId = req.user.id;
    try {
        const device = await prisma.device.findUnique({
            where: { id: deviceId, userId }, // Only get device if it belongs to the user
            include: {
                schedule: true
            }
        });
        if(!device) {
            return res.status(404).json({
                message: "Device not found."
            })
        }
        const schedule = device.schedule;
        res.status(200).json({
            message: "Get schedule successfully.",
            schedule
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "System Error" });
    }
}

export const  addSchedule = async (req, res) => {
    const {staredAt, endedAt, deviceId, repeat} = req.body;
    const userId = req.user.id;

    try {
        const device = await prisma.device.findUnique({
            where: {
                id: deviceId,
                userId
            }
        })
        if(!device) {
            return res.status(404).json({
                message: "Device not found."
            })
        }
        if(device.plantId === null) {
            return res.status(400).json({
                message: "Device is not belonging to any plant."
            })
        }
        const schedule = await prisma.schedule.create({
            data: {
                staredAt,
                endedAt,
                deviceId,
                repeat
            }
        })
        res.status(200).json({
            message: "Add schedule successfully.",
            schedule
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "System Error" });
    }
}

export const updateSchedule = async (req, res) => {
    const {staredAt, endedAt, deviceId, repeat} = req.body;
    const userId = req.user.id;

    try {
        const device = await prisma.device.findUnique({
            where: {
                id: deviceId,
                userId
            }
        })
        if(!device) {
            return res.status(404).json({
                message: "Device not found."
            })
        }
        if(device.plantId === null) {
            return res.status(400).json({
                message: "Device is not belonging to any plant."
            })
        }
        const schedule = await prisma.schedule.update({
            where: {
                deviceId
            },
            data: {
                staredAt,
                endedAt,
                repeat
            }
        })
        res.status(200).json({
            message: "Update schedule successfully.",
            schedule
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "System Error" });
    }
}

export const deleteSchedule = async (req, res) => {
    const scheduleId = req.params.scheduleId;
    const userId = req.user.id;
    try {
        const schedule = await prisma.schedule.findUnique({
            where: {
                id: scheduleId
            },
            include: {
                device: {
                    select: {
                        userId: true
                    }
                }
            }
        })
        if(!schedule) {
            return res.status(404).json({
                message: "Schedule not found."
            })
        }
        if(schedule.device.userId !== userId) {
            return res.status(403).json({
                message: "This schedule dont belong to you."
            })
        }
        await prisma.schedule.delete({
            where: {
                id: scheduleId
            }
        })
        res.status(200).json({
            message: "Delete schedule successfully.",
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "System Error" });
    }
}