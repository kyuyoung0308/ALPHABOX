import React from "react";
import "./ControlButtons.css";
  
export default function ControlButtons(props) {
    const ActiveButtons = (
    <div className="reset_button">
        <button className="reset_button1" 
            onClick={props.handleReset}>
        Reset
        </button>
    </div>
    );

    return (
    <div className="Control-Buttons">
        <div>{ActiveButtons}</div>
    </div>
    );
}