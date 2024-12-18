let tasks = [
  {
    id: 1,
    title: "Lessive",
    description: "Faut mettre le linge sale dans la machine à laver",
    date_start: "18/12/2024",
    date_end: "18/12/2024",
    done: true,
  },
  {
    id: 2,
    title: "Faire les courses",
    description: "Acheter des fruits, légumes, et des produits ménagers",
    date_start: "18/12/2024",
    date_end: "18/12/2024",
    done: false,
  },
  {
    id: 3,
    title: "Réviser Java",
    description: "Apprendre les bases de JPA et pratiquer les annotations",
    date_start: "18/12/2024",
    date_end: "20/12/2024",
    done: false,
  },
  {
    id: 4,
    title: "Nettoyer la cuisine",
    description: "Faire la vaisselle et ranger les placards",
    date_start: "19/12/2024",
    date_end: "19/12/2024",
    done: true,
  },
  {
    id: 5,
    title: "Appeler le docteur",
    description: "Prendre rendez-vous pour un contrôle de routine",
    date_start: "19/12/2024",
    date_end: "19/12/2024",
    done: false,
  },
  {
    id: 6,
    title: "Planifier le voyage",
    description: "Réserver les billets de train et l'hôtel",
    date_start: "20/12/2024",
    date_end: "21/12/2024",
    done: false,
  },
  {
    id: 7,
    title: "Faire du sport",
    description: "Aller à la salle de sport pour une séance de musculation",
    date_start: "20/12/2024",
    date_end: "20/12/2024",
    done: true,
  },
  {
    id: 8,
    title: "Lire un livre",
    description: "Commencer un nouveau roman de science-fiction",
    date_start: "21/12/2024",
    date_end: "25/12/2024",
    done: false,
  },
  {
    id: 9,
    title: "Préparer le dîner",
    description: "Cuisiner un repas spécial pour les invités",
    date_start: "22/12/2024",
    date_end: "22/12/2024",
    done: true,
  },
  {
    id: 10,
    title: "Organiser les fichiers",
    description: "Classer les documents importants dans le bon dossier",
    date_start: "23/12/2024",
    date_end: "23/12/2024",
    done: false,
  },
];

let maxId = 10;

// GET Récuperer toutes les tâches
exports.getAllTask = (req, res) => {
  res.json({ tâches: tasks });
};

// GET Récuperer une tâches par son ID
exports.getTaskByID = (req, res) => {
  try {
    const taskId = req.params.id;

    const foundTask = tasks.find((task) => task.id == taskId);

    if (!foundTask) {
      res.status(404).json({ message: "Tâche introuvable" });
    }
    res.status(200).json(foundTask);
  } catch (error) {
    console.error("Erreur lors de la récuperation de la tâche : ", error);
    res.status(500).json({ erreur: error });
  }
};

// POST Ajouter une tâche
exports.addTask = (req, res) => {
  try {
    const { title, description, date_start, date_end, done } = req.body;
    maxId++;

    const newTask = {
      id: maxId,
      title,
      description,
      date_start,
      date_end,
      done,
    };
    tasks.push(newTask);
    res.status(201).json({ message: "Tâche créé avec succès", tâche: newTask });
  } catch (error) {
    console.error("Erreur lors de la création de la tâche : ", error);
    res.status(500).json({ erreur: error });
  }
};

// PUT Modifier une tâche
exports.editTask = (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, description, date_start, date_end, done } = req.body;

    const updatedTask = {
      id: taskId,
      title,
      description,
      date_start,
      date_end,
      done,
    };

    tasks = tasks.filter((task) => task.id != taskId);

    tasks.push(updatedTask);
    res
      .status(201)
      .json({ message: "Tâche modifiée avec succès", tâche: updatedTask });
  } catch (error) {
    console.error("Erreur lors de la modification de la tâche : ", error);
    res.status(500).json({ erreur: error });
  }
};

// DELETE Supprimer une tâche
exports.deleteTask = (req, res) => {
  try {
    const taskId = req.params.id;
    tasks = tasks.filter((task) => task.id != taskId);
    res.status(200).json({ message: "Tâche supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de la tâche : ", error);
    res.status(500).json({ erreur: error });
  }
};
