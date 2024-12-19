const express = require("express");
const router = express.Router();
const axios = require("axios");

// PAGE RENDU PAR LE SERVEUR (SSR) EN EJS
router.get("/", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:8000/api/tasks/list");
    const tasks = response.data["tâches"];
    tasks.map((task) => {
      task.date_start = new Date(task.date_start).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
      task.date_end = new Date(task.date_end).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
    });

    res.render("index", { tasks });
  } catch (error) {
    console.error("Erreur lors de la récuperation des tâches : ", error);
    res.status(500).send({ erreur: "Erreur serveur" });
  }
});

router.get("/show/:id", async (req, res) => {
  const taskId = req.params.id;

  try {
    const response = await axios.get(
      `http://localhost:8000/api/tasks/id/${taskId}`
    );
    const task = response.data;
    task.date_start = new Date(task.date_start).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
    task.date_end = new Date(task.date_end).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });

    res.render("show", { task });
  } catch (error) {
    console.error("Erreur lors de la récuperation de la tâche : ", error);
    res.status(500).send({ erreur: "Erreur serveur" });
  }
});

router.get("/create", async (req, res) => {
  res.render("create");
});

router.get("/edit/:id", async (req, res) => {
  const taskId = req.params.id;

  try {
    const response = await axios.get(
      `http://localhost:8000/api/tasks/id/${taskId}`
    );
    const task = response.data;
    task.date_start = new Date(task.date_start);
    task.date_end = new Date(task.date_end);

    res.render("edit", { task });
  } catch (error) {
    console.error("Erreur lors de la récuperation de la tâche : ", error);
    res.status(500).send({ erreur: "Erreur serveur" });
  }
});

// ACTIONS AVEC REQÊTES API (CRUD)
router.post("/add", async (req, res) => {
  try {
    const { title, description, date_start, date_end, done } = req.body;
    const isDone = done == "true";

    const data = {
      title,
      description,
      date_start,
      date_end,
      done: isDone,
    };

    console.log(data);

    await axios.post(`http://localhost:8000/api/tasks/add`, data);
    res.redirect("/");
  } catch (error) {
    console.error("Erreur lors de la création de la tâche : ", error);
    res.status(500).send({ erreur: "Erreur serveur" });
  }
});

router.get("/delete/:id", async (req, res) => {
  const taskId = req.params.id;

  try {
    await axios.delete(`http://localhost:8000/api/tasks/id/${taskId}`);
    res.redirect("/");
  } catch (error) {
    console.error("Erreur lors de la suppression de la tâche : ", error);
    res.status(500).send({ erreur: "Erreur serveur" });
  }
});

router.post("/edit/:id", async (req, res) => {
  const taskId = req.params.id;

  try {
    const { title, description, date_start, date_end, done } = req.body;
    const isDone = done == "true";

    const updatedTask = {
      title,
      description,
      date_start,
      date_end,
      done: isDone,
    };

    await axios.put(
      `http://localhost:8000/api/tasks/id/${taskId}`,
      updatedTask
    );
    res.redirect("/");
  } catch (error) {
    console.error("Erreur lors de la modification de la tâche : ", error);
    res.status(500).send({ erreur: "Erreur serveur" });
  }
});

module.exports = router;
