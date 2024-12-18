const express = require("express");
const app = express();
const db = require("./app/config/database");

app.use(express.json());

// Imports des Routes
const taskRoutes = require("./app/routes/task");

// Utilisation des Routes
app.use("/api/tasks", taskRoutes);

(async () => {
  try {
    await db.sync({ force: true });
    console.log("La base de données a été synchronisée avec succès !");
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la synchronisation de la base de données :",
      error
    );
  }
})();

module.exports = app;
