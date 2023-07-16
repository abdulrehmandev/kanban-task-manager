"use client";

import TaskCard from "./TaskCard";
import getTasks from "@/firebase/tasks/get-tasks";
import { useState, useEffect } from "react";
import Column from "./Column";

const TaskColumn = ({ column }) => {
  const [tasks, setTasks] = useState([]);

  async function fetchTasks(columnId) {
    getTasks(columnId).then((data) => setTasks(data));
  }

  useEffect(() => {
    if (column) {
      fetchTasks(column.id);
    }
  }, []);

  return (
    <section className="max-w-[250px] min-w-[250px] w-full">
      <Column column={column} />
      <div className="flex flex-col gap-4">
        {tasks && tasks.map((task) => <TaskCard key={task.id} task={task} />)}
      </div>
    </section>
  );
};

export default TaskColumn;
