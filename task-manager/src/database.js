const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database/task_manager.db", (err) => {
	if (err) return console.error(err.message);
	console.log("Connected to the SQLite database.");
});

db.serialize(() => {
	db.run(`CREATE TABLE IF NOT EXISTS tasks (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL,
		completed BOOLEAN NOT NULL DEFAULT 0
	)`);
});

module.exports = db;