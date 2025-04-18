const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const jokebookRoutes = require("./routes/jokebookRoutes");
const db = require("./db/db");
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));  
app.use(cors());
app.use(bodyParser.json());
app.use("/jokebook", jokebookRoutes);

function executeSQLScript(scriptPath) {
  const sql = fs.readFileSync(scriptPath, "utf8");

  db.exec(sql, (err) => {
    if (err) {
      console.error(`Error executing script: ${scriptPath}`, err);
    } else {
      console.log(`Successfully executed script: ${scriptPath}`);
    }
  });
}

function initializeDatabase() {
  const dropTablePath = path.join(__dirname, "db", "drop_table.sql");
  const createTablePath = path.join(__dirname, "db", "create_table.sql");
  const insertDataPath = path.join(__dirname, "db", "insert_data.sql");

  executeSQLScript(dropTablePath);

  setTimeout(() => {
    executeSQLScript(createTablePath);
    setTimeout(() => {
      executeSQLScript(insertDataPath);
    }, 100);
  }, 100);
}

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  initializeDatabase();
});
