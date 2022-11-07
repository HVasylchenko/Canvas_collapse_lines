import "./styles.css";
import { useEffect, useRef, useState } from "react";
import { checkIntersection } from "line-intersect";
import drawLine from "./drawLine";
import drawPoint from "./drawPoint";

export default function App() {
  const canvas = useRef();
  const [isDrawing, setIsDrawing] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });
  const [end, setEnd] = useState({ x: 0, y: 0 });
  const [lines, setLines] = useState([]);
  const [points, setPoints] = useState([]);

  // draw effect – each time isDrawing,
  // start or end change, automatically
  // redraw everything

  useEffect(() => {
    if (!canvas.current) return;
    // clear canvas
    const ctx = canvas.current.getContext("2d");
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    // draw the line
    drawLine(ctx, start, end, "green");

    lines.forEach((line) => {
      // console.log(line[0], line[1]);
      drawLine(ctx, line[0], line[1], "green");
    });

    // draw the points
    if (points.length > 0) {
      points.forEach((point) => {
        drawPoint(ctx, point.x, point.y, "red", 5);
      });
    }
  }, [end, lines, points]);

  function mousedown(e) {
    if (!isDrawing) {
      setStart({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
      setIsDrawing(true);
    }
    if (isDrawing && e.button === 0) {
      setIsDrawing(false);
      let newLine = [
        { x: start.x, y: start.y },
        { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY },
      ];

      if (lines.length > 0) {
        lines.forEach((line) => {
          let point = checkIntersection(
            line[0].x,
            line[0].y,
            line[1].x,
            line[1].y,
            newLine[0].x,
            newLine[0].y,
            newLine[1].x,
            newLine[1].y
          );
          if (point.type === "intersecting") {
            setPoints((oldArray) => [...oldArray, point.point]);
          }
        });
      }
      setLines((oldArray) => [...oldArray, newLine]);
    }
    if (isDrawing && e.button === 2) {
      setIsDrawing(false);
      setStart({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    }
  }

  function mousemove(e) {
    if (isDrawing) {
      setEnd({
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY,
      });
    } else return;
  }

  function collapseLines() {
    const ctx = canvas.current.getContext("2d");
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    setIsDrawing(false);
    setStart({ x: 0, y: 0 });
    setEnd({ x: 0, y: 0 });
    setLines([]);
    setPoints([]);
  }

  return (
    <div className="App">
      <h1>Collapse lines</h1>
      <h3 style={{ margin: "10px 10%" }}>
        Function needed: Allow adding lines by two clicks (first click creates
        the first position; then user moves the mouse and the line should be
        visible); if the user clicks left mouse button again the line should be
        added to image; if user starts drawing and presses right mouse button,
        don’t the line. If a line intersected, show red dot. When the user clicks “collapse lines”, the
        lines and the dots should be disappeared.
      </h3>
      <canvas
        ref={canvas}
        onMouseDown={mousedown}
        onMouseMove={mousemove}
        width="1200"
        height="550"
        style={{ border: "2px solid red", borderRadius: "8px" }}
      ></canvas>
      <div style={{ margin: "5px auto", padding: "4px" }}>
        <button
          style={{
            fontSize: "28px",
            border: "2px solid red",
            background: "white",
            borderRadius: "6px",
          }}
          onClick={collapseLines}
        >
          Collapse lines
        </button>
      </div>
    </div>
  );
}
