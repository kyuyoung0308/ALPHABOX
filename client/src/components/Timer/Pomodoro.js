import React, { useState, useEffect } from "react";
import "./Pomodoro.css"
import ControlButtons from "./ControlButtons";
import TabBlocker from "./TabBlocker";

export default function Pomodoro() {
    const totalMinutes = 25
    const totalSeconds = 0
    const breakMinutes = 4

    const [minutes, setMinutes] = useState(totalMinutes);
    const [seconds, setSeconds] = useState(totalSeconds);
    const [displayMessage, setDisplayMessage] = useState(false);
    const [workDisplayMessage, setWorkDisplayMessage] = useState(true);
    const [reset, setReset] = useState(false);

    useEffect(() => {
        let interval = setInterval(() => {
            if(reset){
                setSeconds(totalSeconds)
                setMinutes(totalMinutes)
                setReset(false)
                setDisplayMessage(false)
                setWorkDisplayMessage(true)
            }
            else if (seconds === 0) {
                if (minutes !== 0) {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                } else {
                    let minutes = displayMessage ? totalMinutes : breakMinutes;
                    let seconds = 59;

                    setSeconds(seconds);
                    setMinutes(minutes);
                    setDisplayMessage(!displayMessage);
                    setWorkDisplayMessage(false)
                }
            } else {
                setSeconds(seconds - 1);
            }
            clearInterval(interval);
        }, 1000);
    }, [displayMessage, workDisplayMessage, minutes, reset, seconds]);

    const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

    const handleReset = () => {
        setReset(true)
    };

    return (
    <div className="pomodoro">
        <div className="message">
        {displayMessage && <div>Break time! New session starts in: </div>}
        </div>
        <div className="timer">
        <div className="message">
        {workDisplayMessage && <div>Work Time! Break in: </div>}
        </div>{timerMinutes}:{timerSeconds}
        </div>
        <ControlButtons
        handleReset={handleReset}/>
        <TabBlocker/>
    </div>
    );
}
