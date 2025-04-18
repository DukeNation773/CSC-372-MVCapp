const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./jokebook.db", (err) => {
  if (err) {
    console.error("Error opening database: ", err);
  }
});

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY, name TEXT)"
  );
  db.run(
    "CREATE TABLE IF NOT EXISTS jokes (id INTEGER PRIMARY KEY, category_id INTEGER, setup TEXT, delivery TEXT, FOREIGN KEY(category_id) REFERENCES categories(id))"
  );
});

module.exports = db;
