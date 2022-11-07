function drawPoint(context, x, y, color, size) {
      if (color == null) {
          color = '#000';
      }
      if (size == null) {
          size = 5;
      }

      context.beginPath();
      context.fillStyle = color;
      context.arc(x, y, size, 0 * Math.PI, 2 * Math.PI);
      context.fill();
  }

export default drawPoint;