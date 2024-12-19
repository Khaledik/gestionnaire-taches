const express = require("express");
const router = express.Router();

const middlewareVerif = require("../middlewares/verifications");

const taskController = require("../controllers/task");

router.get("/list", taskController.getAllTask);

router.get("/id/:id", taskController.getTaskByID);

router.post("/add", middlewareVerif.task, taskController.addTask);

router.put("/id/:id", middlewareVerif.task, taskController.editTask);

router.delete("/id/:id", taskController.deleteTask);

module.exports = router;
