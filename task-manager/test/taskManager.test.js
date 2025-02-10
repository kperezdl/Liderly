const TaskManager = require("../src/taskManager");
const db = require("../src/database");

beforeAll((done) => {
	db.serialize(() => {
		db.run("DELETE FROM tasks", done);
	});
});

describe("TaskManager", () => {
	test("should add a task successfully", (done) => {
		TaskManager.addTask("Learn Jest", (err, task) => {
			expect(err).toBeNull();
			expect(task).toEqual({ id: 1, name: "Learn Jest", completed: false });
			done();
		});
	});

	test("should get all tasks", (done) => {
		TaskManager.getAllTasks((err, tasks) => {
			expect(err).toBeNull();
			expect(tasks.length).toBe(1);
			done();
		});
	});

	test("should edit a task", (done) => {
		TaskManager.editTask(1, "Learn Jest and SQLite", (err, task) => {
			expect(err).toBeNull();
			expect(task).toEqual({ id: 1, name: "Learn Jest and SQLite" });
			done();
		});
	});

	test("should delete a task", (done) => {
		TaskManager.deleteTask(1, (err) => {
			expect(err).toBeNull();
			TaskManager.getAllTasks((err, tasks) => {
				expect(err).toBeNull();
				expect(tasks.length).toBe(0);
				done();
			});
		});
	});
});