import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import TaskHelper from "./taskHelper";
import {
  db,
  auth,
  collection,
  addDoc,
  serverTimestamp,
} from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./tasks.css";

function Tasks() {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState("");
    const [user] = useAuthState(auth);
    
    const tasksRef = db.collection('users').doc(user.email).collection('todos').orderBy("timestamp", "desc");
  useEffect(() => {
    tasksRef.onSnapshot((snapshot) => {
      setTodos(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          item: doc.data(),
        }))
      );
    });
  }, [input, tasksRef]);
  const addTodo = (e) => {
    e.preventDefault();
    addDoc(collection(db, 'users', user.email, 'todos'), {
      todo: input,
      timestamp: serverTimestamp(),
    });
    console.log("click");
    setInput("");
  };
  //console.log(todos);

  return (
    <div className="Tasks">
      <h2>To-do List</h2>
      <form>
        <TextField
          id="outlined-basic"
          label="New task..."
          variant="outlined"
          style={{ margin: "0px 5px" }}
          size="small"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={addTodo}>
          Add Task
        </Button>
      </form>
      <ul>
        {todos.map((item) => (
          <TaskHelper key={item.id} arr={item} />
        ))}
      </ul>
    </div>
  );
}

export default Tasks;
