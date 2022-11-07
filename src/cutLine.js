function cutLine(line, scale) {
  let newLine = [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ];
  let distanceX = line[1].x - line[0].x;
  let distanceY = line[1].y - line[0].y;
//   console.log( "distanceX", distanceX, scale, line[0].x)

  newLine[0].x = line[0].x + distanceX * scale;
  newLine[1].x = line[1].x - distanceX * scale;
//   console.log( "distanceX", distanceX, scale, line[0].x, newLine[0].x)

  newLine[0].y = line[0].y + distanceY * scale;
  newLine[1].y = line[1].y - distanceY * scale;
//   console.log( " line",  line)
//   console.log( " newLine",  newLine)

  return newLine;
}

export default cutLine;
