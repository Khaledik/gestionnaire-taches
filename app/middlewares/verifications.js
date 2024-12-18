exports.task = (req, res, next) => {
  const { title, description, date_start, date_end, done } = req.body;

  if (!title || title == "") {
    res
      .status(400)
      .json({ erreur: "Le titre est obligatoire et ne doit pas être vide" });
  }

  if (!date_start || date_start == "") {
    res.status(400).json({
      erreur: "La date de début est obligatoire et ne doit pas être vide",
    });
  }

  // if (!done) {
  //   res.status(400).json({
  //     erreur:
  //       "Le status est obligatoire et doit être une valeur booleen (true | false)",
  //   });
  // }

  next();
};
