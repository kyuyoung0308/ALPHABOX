//basic whiteboard application for sprint 1
//import { linkWithCredential } from "firebase/auth";
import React, { useEffect, useRef, useState, useCallback } from "react";
//import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
// Styling
import "./whiteboard.css";
//adding in the colors for our whiteboard
const colors = ["#000000"];
//adding different stroke sizes
const sizes = [50];
  
let restore = [];
let index = -1;

function Whiteboard(props) {

  //for rendering context using 2d
  const ctx = useRef(null);

  const canvasRef = useRef(null);
  //declaring the initial states
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [mouseDown, setMouseDown] = useState(false);
  const [lastPosition, setPosition] = useState({ x: 0, y: -150 });
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [mouseLeave, setMouseLeave] = useState(true);


  useEffect(() => {
    if (canvasRef.current) {
      //for rendering context using 2d
      ctx.current = canvasRef.current.getContext('2d');
    }
  })


  // draw fucntion using callback to track the position of the stroke
  const draw = useCallback((x, y) => {
    if (mouseDown) {
      ctx.current.beginPath();
      ctx.current.strokeStyle = selectedColor;
      //can make dynamic later, but for now set the width constant
      ctx.current.lineWidth = selectedSize;
      ctx.current.lineJoin = 'round';
      ctx.current.moveTo(lastPosition.x, lastPosition.y);
      ctx.current.lineTo(x, y);
      ctx.current.closePath();

      ctx.current.stroke();

      setPosition({ x, y });
    }
  }, [lastPosition, mouseDown, selectedColor, selectedSize, setPosition]);

  //erase function to clear current canvas, using a white rectanlge to fill
  const erase = () => {
    ctx.current.clearRect(0, 0, ctx.current.canvas.width, ctx.current.canvas.height);
    restore = [];
    index = -1;
  };
  //download the image to local device
  const download = async ()=>{
    const pro = prompt("What would you like to name your image?");
    if(pro == null){
      return;
    }
    else{
    await alert("Your image will be named: "+pro);
    const image = canvasRef.current.toDataURL(prompt+'/png');
    const img = await (await fetch(image)).blob();
    const imgURL = URL.createObjectURL(img);
    const link = document.createElement('a');
    link.href = imgURL;
    link.download = pro+".png";
    link.click();
    }
  };

 
  const undo= () =>{
    if(index <= 0){
      erase();
    }else{
      index -= 1;
      restore.pop();
      ctx.current.putImageData(restore[index],0,0);
    }
  };

  //mouse down function to set the position of brush with offset
  const onMouseDown = (e) => {
    setPosition({ x: e.pageX, y: e.pageY - 150 })
    setMouseDown(true)
  };
  const onMouseLeave=(e)=>{
    setMouseLeave(true);
  };
  //mouse up when finished drawing set the mousedown to false
  const onMouseUp = (e) => {
    setMouseDown(false)
    if(mouseLeave){
        restore.push(ctx.current.getImageData(0, 0, ctx.current.canvas.width, ctx.current.canvas.height));
        index+=1;
        console.log(restore);
    }
  };
  
  //mousemove fucntion that calls draw function to draw as user is moving mouse
  const onMouseMove = (e) => {
    draw(e.pageX, e.pageY - 150);
  }
  //const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="Whiteboard">
      <Container fluid className="container">
        <h1>Welcome to the Whiteboard</h1>
      </Container>

      <Container fluid className="button1">
        <div onClick={(e) => setSelectedColor("#000000")} className ="colorfield" style ={{background: "black"}}></div>
        <div onClick={(e) => setSelectedColor("#0000FF")} className ="colorfield" style ={{background: "blue"}}></div>
        <div onClick={(e) => setSelectedColor("#FF0000")} className ="colorfield" style ={{background: "red"}}></div>
        <div onClick={(e) => setSelectedColor("#FFFF00")} className ="colorfield" style ={{background: "yellow"}}></div>

        <div onClick={(e) => setSelectedColor("#FF00FF")} className ="colorfield" style ={{background: "#FF00FF"}}></div>
        <div onClick={(e) => setSelectedColor("#FFA500")} className ="colorfield" style ={{background: "#FFA500"}}></div>


        <input value ={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}type="color" className = "picker"></input>

        <input onChange={(e) => setSelectedSize(e.target.value)} type="range" min="1" max ="50" className="size"></input>
        <button onClick={erase} className="button">Erase All</button>
        <button onClick={download} className="button">Download</button>
        <button onClick={undo} className="button">Undo</button>
      </Container>
      <canvas id="canvas"
        style={{ backgroundColor: "white" }}
        width={window.innerWidth}
        height={window.innerHeight}
        ref={canvasRef}

        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
      >
      </canvas>

    </div>
  );
};

export default Whiteboard;