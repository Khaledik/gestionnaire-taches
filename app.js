const express = require("express");
const app = express();

app.use(express.json());

// Imports des Routes
const taskRoutes = require("./app/routes/task");

// Utilisation des Routes
app.use("/api/tasks", taskRoutes);

module.exports = app;
