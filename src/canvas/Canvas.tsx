import React from "react";
import { Stage, Layer, Rect, Circle, Text } from 'react-konva'

export function Canvas(): React.ReactElement {
    return (
        <Stage width={window.innerWidth} height={window.innerHeight}>
            <Layer>
                <Text text="Some text on canvas" fontSize={15} />
                <Rect
                x={20}
                y={50}
                width={100}
                height={100}
                fill="red"
                shadowBlur={10}
                />
                <Circle x={200} y={100} radius={50} fill="green" />
            </Layer>
        </Stage>
    );
}