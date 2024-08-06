import React, { useState, useEffect } from "react";

const TodoList = ({ tasks, list, onDelete }) => {
  return (
    <div className="box">
      <h2>{list}</h2>

      {tasks.map((task, index) => (
        <p key={index}>
          {task}
          <button onClick={() => onDelete(index, list)}></button>
        </p>
      ))}
    </div>
  );
};

const TodoApp = () => {
  const [task, setTask] = useState("");
  const [list, setList] = useState("personal");
  const [personalTasks, setPersonalTasks] = useState([]);
  const [workTasks, setWorkTasks] = useState([]);

  useEffect(() => {
    const storedPersonalTasks =
      JSON.parse(localStorage.getItem("personalTasks")) || [];
    const storedWorkTasks = JSON.parse(localStorage.getItem("workTasks")) || [];

    setPersonalTasks(storedPersonalTasks);
    setWorkTasks(storedWorkTasks);
  }, []);

  useEffect(() => {
    // Save tasks to local storage whenever they change
    localStorage.setItem("personalTasks", JSON.stringify(personalTasks));
    localStorage.setItem("workTasks", JSON.stringify(workTasks));
  }, [personalTasks, workTasks]);

  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  const handleListChange = (e) => {
    setList(e.target.value);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (list === "personal") {
      setPersonalTasks([...personalTasks, task]);
    } else if (list === "work") {
      setWorkTasks([...workTasks, task]);
    }
    setTask("");
  };

  const handleDeleteTask = (index, taskList) => {
    if (taskList === "personal") {
      const updatedTasks = [...personalTasks];
      updatedTasks.splice(index, 1);
      setPersonalTasks(updatedTasks);
    } else if (taskList === "work") {
      const updatedTasks = [...workTasks];
      updatedTasks.splice(index, 1);
      setWorkTasks(updatedTasks);
    }
  };

  return (
    <div>
      <form className="create-list" onSubmit={handleAddTask}>
        <select name="list" value={list} onChange={handleListChange}>
          <option value="personal">Personal</option>
          <option value="work">Work</option>
        </select>
        <button>
          <img
            width="30"
            height="30"
            src="https://img.icons8.com/ios-filled/50/add--v1.png"
            alt="add task"
          />
        </button>
        <input
          type="text"
          name="task"
          placeholder="Add a task"
          value={task}
          onChange={handleTaskChange}
          required
        />
      </form>

      <TodoList
        tasks={personalTasks}
        list="personal"
        onDelete={handleDeleteTask}
      />
      <TodoList tasks={workTasks} list="work" onDelete={handleDeleteTask} />
    </div>
  );
};

export default TodoApp;
