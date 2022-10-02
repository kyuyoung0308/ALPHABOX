import React, { useState, useEffect } from "react";
import { collection, getDocs, db, auth, getTodo } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Todo from "./todo";

export default function TodoList() {
    const [user] = useAuthState(auth);
    const [todoList, setTodoList] = useState();

    // const todoRef = db
    //   .collection("users")
    //   .doc(user.email)
    //   .collection("todo")
    //   .get()
    //   .then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //         // doc.data() is never undefined for query doc snapshots
    //         console.log(doc.id, " => ", doc.data());
    //     });
    // });

    //   console.log(todoRef);

    useEffect(() => {
        getTodo().then(function (result) {
          setTodoList(result);
          //console.log(result);
          //console.log("Set todoList:");
          //console.log(todoList);
          if (todoList) {
            displayList();
            console.log("There is a todoList");
          };
        });
        // setTimeout(() => {
        // }, 2000);
    }, []);
    
  const displayList = () => {
    let targetDiv = document.getElementById("todoList");
    // targetDiv.append(<ol id="list"></ol>);
    // let targetList = document.getElementById("list");

    for (let i = 0; i < todoList.length; i++) {
        let name = todoList[i].taskName;
        //console.log(name);
        targetDiv.append(<li>${name}</li>);
        //console.log(targetDiv.textContent);
    }
  }


  return (
    <div id="todoList">
      {/* <button onClick={displayList}>
              Load
          </button> */}
      {/* {todoList
            ? todoList.map((todo, index) => <Todo todo={todo} key={index} />)
            : ""} */}
      {/* {todoList.map((task) => (
        <li>{task.taskName}</li>
      ))} */}
    </div>
  );
}