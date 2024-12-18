const { task } = require("../middlewares/verifications");
const Task = require("../models/Task");

// GET Récuperer toutes les tâches
exports.getAllTask = async (req, res) => {
  try {
    await Task.findAll().then((task) => res.status(200).json({ tâches: task }));
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
    const taskId = req.params.id;

    const foundTask = await Task.findByPk(taskId);

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

    const newTask = await Task.create({
      title,
      description,
      date_start,
      date_end,
      done,
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
    const taskId = req.params.id;
    const { title, description, date_start, date_end, done } = req.body;

    const foundTask = await Task.findByPk(taskId);

    if (!foundTask) {
      res.status(404).json({ erreur: "Tâche à modifier introuvable" });
    }

    const updatedTask = {
      title,
      description,
      date_start,
      date_end,
      done,
    };

    await Task.update(req.body, { where: { id: taskId } }).then(
      (taskUpdated) => {
        if (taskUpdated[0] == 1) {
          res.status(201).json({
            message: "Tâche modifiée avec succès",
            tâche: updatedTask,
          });
        } else {
          res.status(403).json({
            erreur: "id inconnu",
          });
        }
      }
    );
  } catch (error) {
    console.error("Erreur lors de la modification de la tâche : ", error);
    res.status(500).json({ erreur: error });
  }
};

// DELETE Supprimer une tâche
exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    const foundTask = await Task.findByPk(taskId);

    if (!foundTask) {
      res.status(404).json({ erreur: "Tâche à supprimer introuvable" });
    }

    await Task.destroy({ where: { id: taskId } });

    res.status(200).json({ message: "Tâche supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de la tâche : ", error);
    res.status(500).json({ erreur: error });
  }
};
