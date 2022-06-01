import React, { createRef, useEffect, useRef, useState } from 'react';
import './App.css';
import Konva from 'konva';
import { Circle, Layer, Text } from 'react-konva';
import { ViewportStage } from './Viewport/Viewport';





function MyCircle(props: any) {
  const [color, setColor] = useState("green");
  return (
    <Circle
      x={props.x}
      y={props.y}
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
  const [text, setText] = useState('Teste');

  return (
    <div className="App">
      <ViewportStage width={window.innerWidth} height={window.innerHeight} grid={20}>
        <Layer>
          <MyCircle/>
          <MyCircle x={100}/>
          <MyCircle y={100}/>
          <MyCircle x={100} y={100}/>
        </Layer>
      </ViewportStage>
    </div>
  );
}

export default App;
