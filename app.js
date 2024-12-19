const express = require("express");
const app = express();

app.use(express.json());

// Définition du moteur de templating
app.set("view engine", "ejs");
app.set("views", "./app/views");
app.use(express.static("./app/public"));
app.use(express.urlencoded({ extended: true }));

// Imports des Routes
const taskRoutes = require("./app/routes/task");
// Imports Routes des vues
const viewsRoutes = require("./app/routes/views/viewsRoutes");

// Utilisation des Routes
app.use("/api/tasks", taskRoutes);

// Utilisation des Routes vues
app.use("/", viewsRoutes);

module.exports = app;
