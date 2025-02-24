import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getPlants = async (req, res) => {
  const userId = req.user.id;
  try {
    const plants = await prisma.plant.findMany({
      where: { userId: userId },
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

// get all users (just for testing)
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
        user: true,
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