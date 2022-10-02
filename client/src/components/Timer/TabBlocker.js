import React, { useEffect } from "react";
  
export default function TabBlocker() {
    useEffect(() => {
        window.addEventListener("blur", onBlur)
        return() => {
            window.removeEventListener("blur", onBlur)
        }
    })

    const onBlur = () => {
         alert('You are not allowed to leave page!');
    };
     return <></>
}