import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Circle, Layer, Stage } from 'react-konva';

function MyCircle() {

  const [color, setColor] = useState("green");

  return (
    <Circle
      x={200}
      y={100}
      radius={50}
      fill={color}
      onTouchStart={e=>{setColor('blue')}}
      onTouchEnd={e=>{setColor('green')}}
      onDragEnd={e=>{setColor('green')}}
      onMouseLeave={e=>{setColor('green')}}
      onMouseEnter={e=>{setColor('red')}}
      draggable
    />
  );
}


function App(): React.ReactElement {
  return (
    <div className="App">
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer >
          <MyCircle/>
          <MyCircle/>
        </Layer>
      </Stage>
    </div>
  );
}

export default App;
