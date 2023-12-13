import React, { useState } from "react";
import "./App.css";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Zoom from "@mui/material/Zoom";
import Sidebar from "./Sidebar";
import HomeIcon from "@mui/icons-material/Home";
import Checkbox from "@mui/material/Checkbox";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const App = () => {
  const [isExpanded, setExpanded] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "pending",
  });
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const expand = () => {
    setExpanded(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleAddTask = () => {
    setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
    setNewTask({ title: "", description: "", dueDate: "", status: "pending" });
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <div className="app d-flex flex-row">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="home text-white">
        <div className="header d-flex flex-row align-items-center">
          <HomeIcon
            sx={{ height: "45px", width: "auto", margin: "0 5px 5px 0" }}
          />
          <h1>Tasks</h1>
        </div>
        <form className="create-note">
          {isExpanded && (
            <input
              name="title"
              placeholder="Title"
              value={newTask.title}
              onChange={handleInputChange}
            />
          )}
          <textarea
            name="description"
            onClick={expand}
            placeholder={isExpanded ? "Content" : "Add a task..."}
            // rows={isExpanded ? 3 : 1}
            rows={1}
            value={newTask.description}
            onChange={handleInputChange}
          />
          {isExpanded && (
            <input
              type="date"
              name="dueDate"
              value={newTask.dueDate}
              onChange={handleInputChange}
              style={{ marginBottom: "15px" }}
            />
          )}
          <Zoom in={isExpanded}>
            <Fab onClick={handleAddTask}>
              <AddIcon />
            </Fab>
          </Zoom>
        </form>
        <h2 style={{ borderBottom: "solid 1px white" }}>All tasks</h2>
        <ul>
          {tasks.map((task) => (
            <li
              className="tasks d-flex flex-row align-items-start"
              key={task.id}
            >
              <Checkbox
                checked={checked}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
              />
              <div className="bottom my-1">
                <p className="fs-5">
                  <span className="fw-bold">{task.title} :</span>{" "}
                  {task.description}
                </p>
                <div className="d-flex flex-row align-items-center">
                  <CalendarTodayIcon
                    className="me-2"
                    sx={{ height: "16px", width: "auto" }}
                  />
                  <p>{task.dueDate}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
