import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { HOST } from "./helper";
export const UserContext = createContext();

const Provider = ({ children }) => {
  const host = HOST;
  const tasksInitial = [];
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState(tasksInitial);
  const [isAdmin, setIsAdmin] = useState(false);

  const signupUser = async ({ name, email, password }) => {
    try {
      const response = await fetch(`${host}/api/users/signup`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const json = await response.json();

      if (json.success) {
        localStorage.setItem("token", json.token);

        setIsAdmin(json.isAdmin);
        toast.success("Account created successfully");
      } else {
        toast.error(json.message);
      }
      return json;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const loginUser = async ({ email, password }) => {
    try {
      const response = await fetch(`${host}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();

      if (json.success) {
        localStorage.setItem("token", json.token);

        setIsAdmin(json.isAdmin);
        toast.success("Logged in successfully");
      } else {
        toast.error(json.message);
      }

      return json;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAllUsers = async (id) => {
    try {
      const response = await fetch(`${host}/api/users/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      });
      const users = await response.json();
      setUsers(users);
    } catch (error) {
      console.error("Error fetching user name:", error);
      return "";
    }
  };

  const getUserNameByID = async (id) => {
    try {
      const response = await fetch(`${host}/api/users/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      });
      const users = await response.json();
      const assignedUser = users.find((user) => user._id === id);
      return assignedUser ? assignedUser.name : "";
    } catch (error) {
      console.error("Error fetching user name:", error);
      return "";
    }
  };

  const getTasks = async () => {
    try {
      const response = await fetch(`${host}/api/tasks/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      setTasks(json.tasks);
      setIsAdmin(json.isAdmin);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const createTask = async (taskName, assignedTo, status) => {
    try {
      const response = await fetch(`${host}/api/tasks/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({ taskName, assignedTo, status }),
      });

      const task = await response.json();
      setTasks([task, ...tasks]);
      toast.success("Task created successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`${host}/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      });

      const newTasks = tasks.filter((task) => {
        return task._id !== id;
      });
      setTasks(newTasks);
      toast.success("Task deleted sucessfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const requestForApproval = async (newStatus, id) => {
    try {
      await fetch(`${host}/api/tasks/request-status-change/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({ newStatus }),
      });

      toast.success("Request generated. Waiting for admin to approved");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const approvedStatusChange = async (id, approved) => {
    try {
      await fetch(`${host}/api/tasks/approve-status-change/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({ approved }),
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    tasks,
    isAdmin,
    users,
    signupUser,
    loginUser,
    getAllUsers,
    getUserNameByID,
    getTasks,
    createTask,
    deleteTask,
    requestForApproval,
    approvedStatusChange,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default Provider;
