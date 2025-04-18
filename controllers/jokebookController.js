const jokebookModel = require("../models/jokebookModel");

function getCategories(req, res) {
  jokebookModel.getAllCategories((err, categories) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json({ categories });
  });
}

function getJokesByCategory(req, res) {
  const { category } = req.params;
  let { limit } = req.query;

  if (limit) {
    limit = parseInt(limit);
    if (isNaN(limit)) {
      return res.status(400).json({ error: "Limit must be a number" });
    }
  } else {
    limit = 5;
  }
  jokebookModel.getJokesByCategory(category, limit, (err, jokes) => {
    if (err) {
      return res.status(404).json({ error: err });
    }
    res.json({ jokes });
  });
}

function getRandomJoke(req, res) {
  jokebookModel.getRandomJoke((err, joke) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json({ joke });
  });
}

function addJoke(req, res) {
  const { category, setup, delivery } = req.body;

  if (!category || !setup || !delivery) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  jokebookModel.addJoke(category, setup, delivery, (err, newJoke) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json({ message: "Joke added", newJoke });
  });
}

module.exports = {
  getCategories,
  getJokesByCategory,
  getRandomJoke,
  addJoke,
};
