import React, { useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Konva from 'konva';
import { Circle, KonvaNodeComponent, KonvaNodeEvents, Layer, Stage, StageProps } from 'react-konva';
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

  const stage = useRef<Konva.Stage>(null)

  const zoomWheel = (e: KonvaEventObject<WheelEvent>)=>{
    e.evt.preventDefault();
    if (e.evt.deltaY.toString().length > 10) {
      const scaleBy = 1-e.evt.deltaY*0.01;
      const oldScale = stage.current?.scaleX();
      const pointer = stage.current?.getPointerPosition();
      if (stage.current && pointer && oldScale){
        const mousePointTo = {
          x: (pointer.x - stage.current.x())/oldScale,
          y: (pointer.y - stage.current.y())/oldScale
        }
        let direction = e.evt.deltaY > 0 ? 1 : -1;
        if (e.evt.ctrlKey){
          direction = -direction;
        }
        const newScale = oldScale * scaleBy;
        stage.current.scale({x: newScale, y: newScale});
        const newPos = {
          x: pointer.x - mousePointTo.x * newScale,
          y: pointer.y - mousePointTo.y * newScale
        }
        stage.current.position(newPos);
      }
    }
    else if (stage.current) {
      stage.current.position({x:e.evt.deltaX, y:e.evt.deltaY});
    }
  }


  let startTouchCenter: Vec2 | null;
  let startPosition: Vec2 | null;
  let startDist = 1;
  let startScale = 0;
  const zoomMultTouchStart = (e: KonvaEventObject<TouchEvent>)=>{
    if (e.evt.touches.length == 2 && stage.current) {
      const p1 = new Vec2(e.evt.touches[0].clientX, e.evt.touches[0].clientY);
      const p2 = new Vec2(e.evt.touches[1].clientX, e.evt.touches[1].clientY);
      startDist = p1.clone().sub(p2).mag();
      startTouchCenter = p1.add(p2).div(2);
      startScale = stage.current.scaleX();
      startPosition = new Vec2(stage.current.x(), stage.current.y());
    }
  }
  const zoomMultTouchMove = (e: KonvaEventObject<TouchEvent>)=>{
    e.evt.preventDefault();
    if (e.evt.touches.length == 2 && stage.current && startPosition && startTouchCenter) {
      const p1 = new Vec2(e.evt.touches[0].clientX, e.evt.touches[0].clientY);
      const p2 = new Vec2(e.evt.touches[1].clientX, e.evt.touches[1].clientY);
      const scale = p1.clone().sub(p2).mag();
      const scaleBy = scale/startDist*startScale
      stage.current.setPosition({x:startPosition.x,y:startPosition.y});
      stage.current.scale({x:scaleBy,y:scaleBy});
      const delta = p1.add(p2).div(2).sub(startTouchCenter)
      const newPos = delta.add(startPosition)
      stage.current.setPosition({x:newPos.x,y:newPos.y});
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
       ref={stage}
       onWheel={zoomWheel}
       onTouchStart={zoomMultTouchStart}
       onTouchMove={zoomMultTouchMove}
       onTouchEnd={zoomMultTouchEnd}
      >
        <Layer>
          <MyCircle/>
          <MyCircle/>
        </Layer>
      </Stage>
    </div>
  );
}

export default App;
