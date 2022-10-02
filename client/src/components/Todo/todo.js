import React, { useState } from "react";
import { db, auth } from "../../firebase";

export default function Todo({ todo }) {
  const [newName, setNewTitle] = useState("");

  const deleteTodo = () => {
    const todoRef = db
          .collection("users")
          .doc(auth.currentUser.email)
          .collection("todo")
          .doc(todo.id);

    todoRef.remove();
  };

  const completeTodo = () => {
    const todoRef = db
      .collection("users")
      .doc(auth.currentUser.email)
      .collection("todo")
      .doc(todo.id);

    todoRef.update({
      complete: !todo.complete,
    });
  };

  const editTodo = () => {
    const todoRef = db
      .collection("users")
      .doc(auth.currentUser.email)
      .collection("todo")
      .doc(todo.id);
    todoRef.update({
      taskName: newName,
    });
  };

  const handleChange = (e) => {
    //e.preventDefault();
    if (todo.complete === true) {
      setNewTitle(todo.taskName);
    } else {
      todo.title = "";
      setNewTitle(e.target.value);
    }
  };
  
  return (
    <li className={todo.complete ? "complete" : "list-item"}>
      <input
        type="text"
        value={todo.taskName === "" ? newName : todo.taskName}
        className="list"
        onChange={handleChange}
      />

      <h1 className={todo.complete ? "complete" : ""}>{todo.taskName}</h1>
      <div>
        {/* <button onClick={deleteTodo}>Delete</button>
        <button onClick={completeTodo}>Complete</button> */}

        <button className="button-edit task-button" onClick={editTodo}>
          <i className="fa fa-edit"></i>
        </button>
        <button className="button-complete task-button" onClick={completeTodo}>
          <i className="fa fa-check-circle"></i>
        </button>
      </div>
    </li>
  );
}