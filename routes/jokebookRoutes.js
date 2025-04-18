const express = require("express");
const router = express.Router();
const jokebookController = require("../controllers/jokebookController");

router.get("/joke/random", jokebookController.getRandomJoke);
router.get("/categories", jokebookController.getCategories);
router.get("/joke/:category", jokebookController.getJokesByCategory);
router.post("/joke/add", jokebookController.addJoke);

module.exports = router;
