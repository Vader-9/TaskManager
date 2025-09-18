import { Plus, Trash2, Pencil } from 'lucide-react';
import { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Today({
  input,
  setInput,
  addTasks,
  setAddTasks,
  setNumberofTasks,
  numberofTasks,
  displayPriority,
  search,
  setTaskInfo,
  folders,
  activeFolder,
}) {
  const [editId, setEditId] = useState(null);
  const [managePriority, setManagePriority] = useState(0);
  const [manageProgress, setManageProgress] = useState(0);
  const [completedTask, setCompletedTask] = useState(false);

  useEffect(() => {
    setNumberofTasks(addTasks.length);
  }, [addTasks, setNumberofTasks]);

  const today = new Date();
  const yy = today.getFullYear().toString().slice(-2);
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const formatted = `${yy}-${mm}-${dd}`;

  function addTask() {
    if (input !== "") {
      if (editId) {
        setAddTasks((prev) =>
          prev.map((task) =>
            task.id === editId ? { ...task, text: input } : task
          )
        );
        setEditId(null);
      } else {
        setAddTasks((prev) => [
          ...prev,
          {
            id: Date.now(),
            text: input,
            priority: "omega",
            dateAdded: formatted,
            dueDate: "set-deadline",
            list: folders[activeFolder].name,
            progress: "undone",
          },
        ]);
      }
    } else {
      alert("Please enter a task");
    }
    setInput("");
  }

  function removeTask(id) {
    setAddTasks((prev) => prev.filter((task) => task.id !== id));
  }

  function editTask(id) {
    const taskToEdit = addTasks.find((task) => task.id === id);
    if (taskToEdit) {
      setInput(taskToEdit.text);
      setEditId(id);
    }
  }

  function addpriority(id) {
    if (managePriority === 2) {
      setManagePriority(0);
    } else {
      setManagePriority((prev) => prev + 1);
    }
    setAddTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              priority:
                managePriority === 0
                  ? "omega"
                  : managePriority === 1
                  ? "alpha"
                  : "beta",
            }
          : task
      )
    );
  }

  function addProgress(id) {
    if (manageProgress === 1) {
      setManageProgress(0);
    } else {
      setManageProgress((prev) => prev + 1);
    }
    setAddTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              progress:
                manageProgress === 0
                  ? "undone"
                  : manageProgress === 1
                  ? "inprogress"
                  : "beta",
            }
          : task
      )
    );
  }

  function completed(id) {
    setAddTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, progress: "completed" } : task
      )
    );
  }

  const folderName = folders?.[activeFolder]?.name ?? "General List";
  // dont full understand


  const priorityData = displayPriority
    ? addTasks.filter((task) => task.priority === displayPriority)
    : search
    ? addTasks.filter((task) =>
        task.text.toLowerCase().includes(search.toLowerCase())
      )
    : activeFolder
    ? addTasks.filter((task) => task.list === folderName)
    : addTasks;

  return (
    <div className="w-[900px]    p-6  text-white">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-purple-400 pb-3 mb-5">
        <h1 className="text-2xl font-bold tracking-wider text-purple-300 drop-shadow-lg">
          {activeFolder ? folderName : "General List"}
        </h1>
        <span className="text-lg text-pink-400 font-semibold">
          {numberofTasks > 0 ? addTasks.length : ""}
        </span>
      </div>

      {/* Add task input */}
      <div className="flex items-center gap-3 border-b border-indigo-400 pb-4 mb-5">
        <button
          onClick={addTask}
          className="p-2 rounded-full bg-pink-600 hover:bg-pink-500 transition shadow-[0_0_10px_rgba(236,72,153,0.8)]"
        >
          <Plus />
        </button>
        <input
          placeholder="Add New Task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent border-b border-pink-400 focus:outline-none focus:border-cyan-400 text-lg text-white placeholder-pink-300"
        />
      </div>

      {/* Task list */}
      {priorityData.map((task) => (
        <div
          key={task.id}
          className="mb-4 p-4 rounded-xl border border-purple-600 bg-black/40 hover:bg-black/60 transition cursor-pointer shadow-[0_0_15px_rgba(147,51,234,0.7)]"
         
        >
          {/* Task row */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                onClick={(e) => {
                  e.stopPropagation();
                  completed(task.id);
                }}
                className="accent-pink-500 w-5 h-5"
              />
              <h1
                className={`text-xl ${
                  task.progress === "completed"
                    ? "line-through text-gray-400"
                    : "text-cyan-300"
                }`}
              >
                {task.text}
              </h1>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeTask(task.id);
              }}
              className="p-2 text-red-400 hover:text-red-200 hover:scale-110 transition"
            >
              <Trash2 />
            </button>
          </div>

          {/* Task details */}
          <div className="mt-3 flex gap-4 flex-wrap text-sm text-purple-200">
            <p>{task.dateAdded.toString()}</p>
            <p className="text-pink-400">{task.dueDate}</p>
            <p className="text-cyan-400">{task.list}</p>
            <p className="text-cyan-400" onClick={() =>
            setTaskInfo({
              text: task.text,
              priority: task.priority,
              dateAdded: task.dateAdded.toString(),
              dueDate: task.dueDate,
              list: folderName,
            })
          }>more</p>
            <p
              onClick={
                task.progress === "completed" || displayPriority
                  ? undefined
                  : () => addpriority(task.id)
              }
              className={`cursor-pointer px-2 py-1 rounded-lg ${
                task.progress === "completed"
                  ? "text-gray-500"
                  : "hover:bg-purple-600 text-purple-300"
              }`}
            >
              {task.priority}
            </p>

            <p
              onClick={
                task.progress === "completed"
                  ? undefined
                  : () => addProgress(task.id)
              }
              className={`cursor-pointer px-2 py-1 rounded-lg ${
                task.progress === "completed"
                  ? "text-gray-500"
                  : "hover:bg-cyan-600 text-cyan-300"
              }`}
            >
              {task.progress}
            </p>

            <DatePicker
              selected={
                task.dueDate && task.dueDate !== "set-deadline"
                  ? new Date(task.dueDate)
                  : null
              }
              onChange={(date) =>
                setAddTasks((prev) =>
                  prev.map((t) =>
                    t.id === task.id
                      ? { ...t, dueDate: date.toISOString() }
                      : t
                  )
                )
              }
              placeholderText="Set deadline"
              dateFormat="yy-MM-dd"
              className="bg-transparent border border-pink-500 rounded-md px-2 py-1 text-pink-300 focus:outline-none"
            />

            <button
              onClick={(e) => {
                e.stopPropagation();
                task.progress === "completed" ? null : editTask(task.id);
              }}
              className="p-2 text-green-400 hover:text-green-200 hover:scale-110 transition"
            >
              <Pencil />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Today;
