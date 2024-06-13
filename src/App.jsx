import { useEffect, useState } from "react";
import { DB_ID, COLLECTION_ID, ID, databases } from "./lib/appwrite";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    const response = await databases.listDocuments(DB_ID, COLLECTION_ID);

    console.log(response);
    setTasks(response.documents);
  };

  const handleInput = (e) => {
    setTaskText(e.target.value);
  };

  const addTask = async (e) => {
    e.preventDefault();

    if (taskText) {
      await databases.createDocument(DB_ID, COLLECTION_ID, ID.unique(), {
        text: taskText,
      });

      setTaskText("");

      getTasks();
    }
  };

  getTasks();

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
          </li>
        ))}
      </ul>
    </main>
  );
};

export default App;
