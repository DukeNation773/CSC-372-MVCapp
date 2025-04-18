"use strict";
const db = require("../db/db");

function getAllCategories(callback) {
  let sql = "SELECT setup, delivery FROM categories;";
  db.all(sql, (err, rows) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, rows);
  });
}

function getJokesByCategory(category, limit, callback) {
  if (typeof category !== "string") {
    return callback("Category should be a string", null);
  }

  db.get("SELECT id FROM categories WHERE name = ?", [category], (err, row) => {
    if (err || !row) {
      return callback("Category not found", null);
    }

    const categoryId = row.id;

    db.all(
      "SELECT * FROM jokes WHERE category_id = ? LIMIT ?",
      [categoryId, limit],
      (err, jokes) => {
        if (err) {
          return callback(err, null);
        }
        callback(null, jokes);
      }
    );
  });
}

function getRandomJoke(callback) {
  db.get("SELECT * FROM jokes ORDER BY RANDOM() LIMIT 1", (err, row) => {
    if (err) {
      return callback(err, null);
    }
    if (!row) {
      return callback("No jokes found", null);
    }
    callback(null, row);
  });
}

function addJoke(category, setup, delivery, callback) {
  db.get("SELECT id FROM categories WHERE name = ?", [category], (err, row) => {
    if (err || !row) {
      return callback("Category not found", null);
    }

    const categoryId = row.id;
    const stmt = db.prepare(
      "INSERT INTO jokes (category_id, setup, delivery) VALUES (?, ?, ?)"
    );
    stmt.run([categoryId, setup, delivery], function (err) {
      if (err) {
        return callback(err, null);
      }
      callback(null, { jokeId: this.lastID, category, setup, delivery });
    });
  });
}

module.exports = {
  getAllCategories,
  getJokesByCategory,
  getRandomJoke,
  addJoke,
};
