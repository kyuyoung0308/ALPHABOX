import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Styling
import "./App.css";

// Components
import PrivateRoute from "./privateRoute.jsx";
import Login from "./components/Login/login";
import Register from "./components/Register/register";
import PasswordReset from "./components/PasswordReset/passwordReset";
import HomePage from "./components/HomePage/homepage";
import Whiteboard from "./components/Whiteboard/whiteboard";
import Pomodoro from "./components/Timer/Pomodoro";
import Notebook from "./components/Notebook/notebook";
import Calendar from "./components/Calendar/calendar.js"; //reference to calendar.js
import Journal from "./components/Journal/journal"
import Tasks from "./components/Tasks/tasks";

const Views = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<PasswordReset />} />
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/timer" element={<Pomodoro />} />
          <Route path="/notebook" element={<Notebook />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/whiteboard" element={<Whiteboard />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/tasks" element={<Tasks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Views;