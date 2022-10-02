import React from "react";
import { Link, Navigate } from "react-router-dom";
import {
  auth,
  logout
} from "../../firebase";
// import Form from "../Todo/form";
// import Todolist from "../Todo/todolist";
//import Jumbotron from "react-bootstrap/Jumbotron";
//import Container from "react-bootstrap/Container";

// Components

// Styling
import "./homepage.css";

// Services

function signout() {
  console.log("Sign out started");
  console.log(auth.currentUser);
  logout();
  console.log(auth.currentUser);
  <Navigate to="/login" />;
}

async function setName() {
  let myPromise = new Promise(function (resolve, reject) {
    resolve(auth.currentUser.displayName.split(" ")[0]);
    reject("")
  });
  
  let firstName = await myPromise;
  document.getElementById('greeting').innerHTML = "Hello " + firstName + "!";
}

function HomePage(props) {
  setName();
  console.log(auth.currentUser.displayName.split(" ")[0]);

  return (
    <div className="HomePage">
      <div className="jumbotron">
        <h1 id="greeting">&#8709;</h1>
        <button
          type="button"
          className="btn btn-primary"
          id="logout"
          onClick={signout}
        >
          Logout
        </button>
      </div>
      <div className="container">
        <div className="todocon">
          <Link to="/tasks">
            <button type="button" className="btn btn-primary" id="todo">
              To-do List
            </button>
          </Link>
        </div>
        <div className="fourb">
          <div className="row h-20">
            <Link to="/notebook">
              <button type="button" className="btn btn-primary">
                Notebook
              </button>
            </Link>
            <Link to="/whiteboard">
              <button type="button" className="btn btn-primary">
                Whiteboard
              </button>
            </Link>
          </div>
          <div className="row h-20">
            <Link to="/journal">
              <button type="button" className="btn btn-primary">
                Journal
              </button>
            </Link>
            <Link to="/timer">
              <button type="button" className="btn btn-primary">
                Timer
              </button>
            </Link>
          </div>
        </div>
        <div className="calendar">
          <Link to="/calendar">
            <button type="button" className="btn btn-primary" id="calendar">
              Calendar
            </button>
          </Link>
        </div>
      </div>
      <div className="shortcuts">
        <a
          href="https://drive.google.com/drive/u/0/my-drive"
          type="button"
          className="btn"
          id="gDrive"
          target="_blank"
          rel="noreferrer noopener"
        >
          {" "}
        </a>
        <a
          href="https://owl.uwo.ca/portal"
          type="button"
          className="btn"
          id="owl"
          target="_blank"
          rel="noreferrer noopener"
        >
          {" "}
        </a>
        <a
          href="https://westernuniversity.zoom.us/profile"
          type="button"
          className="btn"
          id="zoom"
          target="_blank"
          rel="noreferrer noopener"
        >
          {" "}
        </a>
      </div>
    </div>
  );
}

export default HomePage;
