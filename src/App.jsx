import { useEffect, useState } from "react";
import { DB_ID, COLLECTION_ID, ID, databases } from "./lib/appwrite";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    try {
      const response = await databases.listDocuments(DB_ID, COLLECTION_ID);

      console.log(response);
      setTasks(response.documents.reverse());
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    }
  };

  const handleInput = (e) => {
    setTaskText(e.target.value);
  };

  const addTask = async (e) => {
    e.preventDefault();

    if (taskText) {
      try {
        await databases.createDocument(DB_ID, COLLECTION_ID, ID.unique(), {
          task: taskText,
          completed: false,
        });

        setTaskText("");
        getTasks();
      } catch (error) {
        console.error("Failed to add the task", error);
      }
    }
  };

  const updateTask = async (id, completed) => {
    try {
      await databases.updateDocument(DB_ID, COLLECTION_ID, id, {
        completed: completed,
      });

      getTasks();
    } catch (error) {
      console.error("Failed to update the task", error);
    }
  };

  return (
    <main className="max-w-3xl w-full mx-auto">
      <form className="flex flex-col gap-4 my-6" onSubmit={addTask}>
        <textarea
          placeholder="Enter a new task..."
          value={taskText}
          onInput={handleInput}
          className="bg-slate-800 shadow-xl w-full h-20 p-4 rounded disabled:bg-slate-900 disabled:placeholder:text-slate-500 disabled:cursor-not-allowed"
        ></textarea>
        <button
          type="submit"
          className="bg-purple-900 px-6 py-2 rounded shadow ml-auto transition hover:bg-white hover:text-purple-900"
        >
          Send
        </button>
      </form>

      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task.$id}
            className="flex items-center border border-white/20 p-4 rounded shadow gap-2"
          >
            <span>{task.completed ? "✅" : "❌"}</span>
            {task.task}
            <input
              className="ml-auto cursor-pointer"
              type="checkbox"
              checked={task.completed}
              onChange={() => updateTask(task.$id, !task.completed)}
            />
          </li>
        ))}
      </ul>
    </main>
  );
};

export default App;
