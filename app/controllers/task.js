const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET Récuperer toutes les tâches
exports.getAllTask = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.status(200).json({ tâches: tasks });
  } catch (error) {
    console.error(
      "Erreur lors de la récuperation de la liste des tâches : ",
      error
    );
    res.status(500).json({ erreur: error });
  }
};

// GET Récuperer une tâches par son ID
exports.getTaskByID = async (req, res) => {
  try {
    const taskId = parseInt(req.params.id);

    if (isNaN(taskId)) {
      return res
        .status(400)
        .json({ erreur: "L'ID doit être un nombre entier" });
    }

    const foundTask = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!foundTask) {
      res.status(404).json({ erreur: "Tâche introuvable" });
    }
    res.status(200).json(foundTask);
  } catch (error) {
    console.error("Erreur lors de la récuperation de la tâche : ", error);
    res.status(500).json({ erreur: error });
  }
};

// POST Ajouter une tâche
exports.addTask = async (req, res) => {
  try {
    const { title, description, date_start, date_end, done } = req.body;

    const formattedDateStart = new Date(date_start).toISOString();
    const formattedDateEnd = date_end
      ? new Date(date_start).toISOString()
      : null;

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        date_start: formattedDateStart,
        date_end: formattedDateEnd,
        done,
      },
    });
    res.status(201).json({ message: "Tâche créé avec succès", tâche: newTask });
  } catch (error) {
    console.error("Erreur lors de la création de la tâche : ", error);
    res.status(500).json({ erreur: error });
  }
};

// PUT Modifier une tâche
exports.editTask = async (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const { title, description, date_start, date_end, done } = req.body;

    if (isNaN(taskId)) {
      return res
        .status(400)
        .json({ erreur: "L'ID doit être un nombre entier" });
    }

    const foundTask = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!foundTask) {
      res.status(404).json({ erreur: "Tâche à modifier introuvable" });
    }

    const formattedDateStart = new Date(date_start).toISOString();
    const formattedDateEnd = date_end
      ? new Date(date_start).toISOString()
      : null;

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        title,
        description,
        date_start: formattedDateStart,
        date_end: formattedDateEnd,
        done,
      },
    });

    res.status(201).json({
      message: "Tâche modifiée avec succès",
      tâche: updatedTask,
    });
  } catch (error) {
    console.error("Erreur lors de la modification de la tâche : ", error);
    res.status(500).json({ erreur: error });
  }
};

// DELETE Supprimer une tâche
exports.deleteTask = async (req, res) => {
  try {
    const taskId = parseInt(req.params.id);

    if (isNaN(taskId)) {
      return res
        .status(400)
        .json({ erreur: "L'ID doit être un nombre entier" });
    }

    const foundTask = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!foundTask) {
      res.status(404).json({ erreur: "Tâche à supprimer introuvable" });
    }

    await prisma.task.delete({ where: { id: taskId } });

    res.status(200).json({ message: "Tâche supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de la tâche : ", error);
    res.status(500).json({ erreur: error });
  }
};
