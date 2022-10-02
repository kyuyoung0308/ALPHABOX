import React, {useState, useEffect} from "react";
import { db, auth, getTodo, addTodo, deleteTodo } from "../../firebase";

// Styling
import "./todo.css";

function Form(props) {
    const [taskName, setTaskName, setTasks] = useState("");
    const createTodo = (e) => {
        e.preventDefault();
        const todoRef = db
          .collection("users")
          .doc(auth.currentUser.email)
          .collection("todo");
        
        const todo = todoRef.doc();
        todo.set({taskName, ID: todo.id});
        todoRef.add(todo);
    };
    const handleChange = (e) => {
      setTaskName(e.target.value);
    };

    return (
    <div className="todo">
        <form onSubmit={createTodo}>
            <input
            type="text"
            placeholder="New todo..."
            className="task-input"
            value={taskName}
            required
            onChange={handleChange}
            />
            <button className="button-add" type="submit">Add</button>
        </form>
    </div>
  );
}

export default Form;
