function drawLine(context, p1, p2, color) {
  context.strokeStyle = color;
  context.beginPath();
  context.moveTo(p1.x, p1.y);
  context.lineTo(p2.x, p2.y);
  context.stroke();
  context.closePath()
}

export default drawLine;
