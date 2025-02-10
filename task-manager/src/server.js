const express = require("express");
const TaskManager = require("./taskManager");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static("public"));

app.get("/tasks", (req, res) => {
	TaskManager.getAllTasks((err, tasks) => {
		if (err) return res.status(500).send(err.message);
		res.json(tasks);
	});

	/*TaskManager.truncateTable((err, tasks) => {
		if (err) return res.status(500).send(err.message);
		res.json(tasks);
	});*/
	
});

app.post("/tasks", (req, res) => {
	const { name } = req.body;
	TaskManager.addTask(name, (err, task) => {
		if (err) return res.status(500).send(err.message);
		res.status(201).json(task);
	});
});

app.put("/tasks/:id", (req, res) => {
	const { id } = req.params;
	if (req.body.name !== '') {
		const { name } = req.body;
		TaskManager.editTask(id, name, (err, task) => {
			if (err) return res.status(500).send(err.message);
			res.json(task);
		});
	} else {
		const { completed } = req.body;
		TaskManager.completedTask(id, completed, (err, task) => {
			if (err) return res.status(500).send(err.message);
			res.json(task);
		});
	}
});

app.delete("/tasks/:id", (req, res) => {
	const { id } = req.params;
	TaskManager.deleteTask(id, (err) => {
		if (err) return res.status(500).send(err.message);
		res.status(204).send();
	});
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});