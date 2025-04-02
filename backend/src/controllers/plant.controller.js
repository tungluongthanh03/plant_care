import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getPlants = async (req, res) => {
  const userId = req.user.id;
  try {
    const plants = await prisma.plant.findMany({
      where: { userId: userId },
      include: {
        devices
      }
    });
    res.status(200).json({
      message: "Get plants successfully.",
      plants,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "System Error" });
  }
};

export const getPlant = async (req, res) => {
  const plantId = req.params.is;
  try{
    const plant = await prisma.plant.findUnique({
      where: { id: plantId },
      include: {
        devices: true
      }
    })
    if(!plant) {
      return res.status(404).json({
        message: "Plant not found."
      })
    }
    res.status(200).json({
      message: "Get plant successfully.",
      plant
    })
  } catch(error) {
    console.error(error);
    res.status(500).json({ message: "System Error" });
  }
}

export const addPlant = async (req, res) => {
    const userId = req.user.id;
    const { name, region } = req.body;
  try {
    const plant = await prisma.plant.create({
      data: {
        name,
        region,
        userId,
        devices: []
      },
      include: {
        devices: true
      }
    });
    res.status(200).json({
      message: "Plant added successfully.",
      plant,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "System Error" });
  }
};

export const updatePlant = async (req, res) => {
  const {name, region, plantId} = req.body;
  if(!name && !region) {
    return res.status(400).json({
      message: "Name or region is required."
    })
  }
  try {
    const plant = await prisma.plant.findUnique({
      where: {
        id: plantId
      }
    })

    if(!plant) {
      return res.status(404).json({ message: "No plant found." })
    }
    
    await prisma.plant.update({
      where: {id: plantId},
      data: {
        name,
        region
      }
    })

    res.status(200).json({
      message: "Plant updated successfully."
    })
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "System Error" });
  }
}

export const deletePlant = async (req, res) => {
  const plantId = req.params.plantId;;

  try {
    const plant = await prisma.findUnique({
      where: {id: plantId},
    })

    if(!plant) {
      return res.status(404).json({ message: "No plant found." })
    }

    
    const devices = await prisma.device.findMany({
      where: {plantId}
    })
    const deviceIds = devices.map(device => device.id)
    // reset devices
    await prisma.device.update({
      where: {
        id: {
          in: deviceIds
        }
      },
      data: {
        threshold: 0,
        working: false,
        status: "AVAILABLE"
      }
    })
    // delete every schedules related to plant
    await prisma.schedule.deleteMany({
      where: {
        deviceId: {
          in: deviceIds
        }
      }
    })
    
    await prisma.plant.delete({
      where: {id: plantId}
    })

    res.status(200).json({ message: "Plant deleted, reseted devices, schedule deleted successfully." })
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "System Error" });
  }
}