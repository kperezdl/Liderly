const db = require("./database");

class TaskManager {
    static getAllTasks(callback) {
        const sql = `SELECT * FROM tasks`;
        db.all(sql, [], (err, rows) => {
            if (err) return callback(err);
            callback(null, rows);
        });
    }

   /* static truncateTable(callback) {
        const sql = `TRUNCATE TABLE tasks`;
        db.run(sql, [], (err, rows) => {
            if (err) return callback(err);
            callback(null, rows);
        });
    }*/

    static addTask(name, callback) {
        const sql = `INSERT INTO tasks (name, completed) VALUES (?, 0)`;
        db.run(sql, [name], function(err) {
            if (err) {
                console.error(err.message);
                return callback(err);
            }
            callback(null, { id: this.lastID });
        });
    }
    
    static editTask(id, name, callback) {
        const sql = `UPDATE tasks SET name = ? WHERE id = ?`;
        db.run(sql, [name, id], function(err) {
            if (err) {
                console.error(err.message);
                return callback(err);
            }
            callback(null, { changes: this.changes });
        });
    }
    
    static completedTask(id, completed, callback) {
        const sql = `UPDATE tasks SET completed = ? WHERE id = ?`;
        db.run(sql, [completed, id], function(err) {
            if (err) {
                console.error(err.message);
                return callback(err);
            }
            callback(null, { changes: this.changes });
        });
    }
    
    static deleteTask(id, callback) {
        const sql = `DELETE FROM tasks WHERE id = ?`;
        db.run(sql, [id], function(err) {
            if (err) {
                console.error(err.message);
                return callback(err);
            }
            callback(null, { changes: this.changes });
        });
    }


}

module.exports = TaskManager;