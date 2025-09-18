function Descripition({ taskInfo }) {
  return (
    <div className="w-[300px]  p-5 ">
      <h1 className="text-lg font-bold text-pink-400 mb-2">
        Task: <span className="text-pink-200">{taskInfo.text}</span>
      </h1>
      <p className="text-sm text-pink-500 mb-3">Task Description</p>

      {/* List info */}
      <div className="mb-3">
        <p className="text-pink-400">
          List name: <span className="text-pink-200">{taskInfo.list}</span>
        </p>
      </div>

      {/* Dates */}
      <div className="mb-3 space-y-1">
        <p className="text-pink-400">
          Due date: <span className="text-pink-200">{taskInfo.dueDate}</span>
        </p>
        <p className="text-pink-400">
          Start date: <span className="text-pink-200">{taskInfo.dateAdded}</span>
        </p>
      </div>

      {/* Priority */}
      <div>
        <p className="text-pink-400">
          Priority:{" "}
          <span
            className={`${
              taskInfo.priority === "alpha"
                ? "text-green-400"
                : taskInfo.priority === "beta"
                ? "text-yellow-400"
                : taskInfo.priority === "omega"
                ? "text-blue-400"
                : "text-pink-200"
            } font-semibold`}
          >
            {taskInfo.priority}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Descripition;
