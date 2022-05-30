import React, { useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Konva from 'konva';
import { Circle, KonvaNodeComponent, KonvaNodeEvents, Layer, Stage, StageProps, Text } from 'react-konva';
import { KonvaNodeEvent } from 'konva/lib/types';
import { KonvaEventObject } from 'konva/lib/Node';
import { Vec2 } from './util/Vec2';


Konva.hitOnDragEnabled = true;

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
  const [text, setText] = useState('Teste');
  const layer = useRef<Konva.Layer>(null)

  const zoomWheel = (e: KonvaEventObject<WheelEvent>)=>{
    e.evt.preventDefault();
    if (e.evt.deltaY.toString().length > 10) {
      const scaleBy = 1-e.evt.deltaY*0.01;
      const oldScale = layer.current?.scaleX();
      const pointer = layer.current?.getRelativePointerPosition();
      if (layer.current && pointer && oldScale){
        const mousePointTo = {
          x: (pointer.x - layer.current.x())/oldScale,
          y: (pointer.y - layer.current.y())/oldScale
        }
        let direction = e.evt.deltaY > 0 ? 1 : -1;
        if (e.evt.ctrlKey){
          direction = -direction;
        }
        const newScale = oldScale * scaleBy;
        layer.current.scale({x: newScale, y: newScale});
        const newPos = {
          x: pointer.x - mousePointTo.x * newScale,
          y: pointer.y - mousePointTo.y * newScale
        }
        layer.current.position(newPos);
      }
    }
    else if (layer.current) {
      layer.current.position({x:layer.current.x()-e.evt.deltaX, y:layer.current.y()-e.evt.deltaY});
    }
  }


  let startTouchCenter: Vec2 | null;
  let startPosition: Vec2 | null;
  let startDist = 1;
  let startScale = 0;
  const zoomMultTouchStart = (e: KonvaEventObject<TouchEvent>)=>{
    if (e.evt.touches.length == 2 && layer.current) {
      const p1 = new Vec2(e.evt.touches[0].clientX, e.evt.touches[0].clientY);
      const p2 = new Vec2(e.evt.touches[1].clientX, e.evt.touches[1].clientY);
      startDist = p1.clone().sub(p2).mag();
      startTouchCenter = p1.add(p2).div(2);
      startScale = layer.current.scaleX();
      startPosition = new Vec2(layer.current.x(), layer.current.y());
    }
  }
  const zoomMultTouchMove = (e: KonvaEventObject<TouchEvent>)=>{
    e.evt.preventDefault();
    if (e.evt.touches.length == 2 && layer.current && startPosition && startTouchCenter) {
      const p1 = new Vec2(e.evt.touches[0].clientX, e.evt.touches[0].clientY);
      const p2 = new Vec2(e.evt.touches[1].clientX, e.evt.touches[1].clientY);
      const scale = p1.clone().sub(p2).mag();
      const mousePointTo = startTouchCenter.sub(layer.current.x(), layer.current.y()).div(startScale);
      const scaleBy = (1+scale/startDist)*startScale
      //stage.current.scale({x:scaleBy,y:scaleBy});
      const pc = p1.clone().sub(mousePointTo).mul(scaleBy);
      //stage.current.position({x:pc.x,y:pc.y});
    }
    return;
  }
  const zoomMultTouchEnd = (e: KonvaEventObject<TouchEvent>)=>{
    if (e.evt.touches.length < 2){

    }
  }

  return (
    <div className="App">
      <Stage
       width={window.innerWidth} height={window.innerHeight}
       onWheel={zoomWheel}
       onTouchStart={zoomMultTouchStart}
       onTouchMove={zoomMultTouchMove}
       onTouchEnd={zoomMultTouchEnd}
      >
        <Layer ref={layer}>
          <MyCircle/>
          <MyCircle/>
        </Layer>
        <Layer>
          <Text x={20} y={20} text={text} fontSize={18} />
        </Layer>
      </Stage>
    </div>
  );
}

export default App;
