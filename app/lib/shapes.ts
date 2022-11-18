import { Layer } from "app/types/avatara";
import { Canvas } from "canvas";
import Color from "color";

export type DefinedShapes = keyof typeof shapes;

const shapes = {
  background: function (
    canvas: Canvas,
    ctx: CanvasRenderingContext2D,
    { color = "#000" }: Layer
  ) {
    ctx.fillStyle = Color(color).rgb().string();
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  },
  rectangle: function (
    canvas: Canvas,
    ctx: CanvasRenderingContext2D,
    { color = "#000" }: Layer
  ) {
    ctx.fillStyle = Color(color).rgb().string();
    ctx.fillRect(0, 0.2 * canvas.height, canvas.width, 0.6 * canvas.height);
  },
  square: function (
    canvas: Canvas,
    ctx: CanvasRenderingContext2D,
    { color = "#000" }: Layer
  ) {
    const margin = 0.13;
    ctx.fillStyle = Color(color).rgb().string();
    ctx.fillRect(
      margin * canvas.width,
      margin * canvas.height,
      (1 - 2 * margin) * canvas.width,
      (1 - 2 * margin) * canvas.height
    );
  },
  squircle: function (
    canvas: Canvas,
    ctx: CanvasRenderingContext2D,
    { color = "#000" }: Layer
  ) {
    const segments = 128;

    const PI = Math.PI,
      TAU = PI * 2,
      n = 4,
      step = TAU / segments,
      dimx = canvas.width / 2,
      dimy = canvas.height / 2,
      r = 0.8,
      rx = dimx * r,
      ry = dimy * r;

    function coord(t: number) {
      let power = 2 / n;
      let c = Math.cos(t),
        x = Math.pow(Math.abs(c), power) * Math.sign(c);
      let s = Math.sin(t),
        y = Math.pow(Math.abs(s), power) * Math.sign(s);
      return { x, y };
    }

    function drawSegmentTo(t: number) {
      let c = coord(t);
      let cx = dimx + rx * c.x;
      let cy = dimy + ry * c.y;
      return { cx, cy };
    }

    ctx.beginPath();
    ctx.moveTo(dimx + rx, dimy);

    for (let t = step; t <= TAU; t += step) {
      let { cx, cy } = drawSegmentTo(t);
      ctx.lineTo(cx, cy);
    }

    ctx.moveTo(dimx + rx, dimy);
    ctx.closePath();

    ctx.fillStyle = Color(color).rgb().string();
    ctx.fill();
  },
  triangle: function (
    canvas: Canvas,
    ctx: CanvasRenderingContext2D,
    { color = "#000" }: Layer
  ) {
    ctx.fillStyle = Color(color).rgb().string();
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(0, canvas.height);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.closePath();
    ctx.fill();
  },

  diamond: function (
    canvas: Canvas,
    ctx: CanvasRenderingContext2D,
    { color = "#000" }: Layer
  ) {
    ctx.fillStyle = Color(color).rgb().string();
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.lineTo(0, canvas.height / 2);
    ctx.closePath();
    ctx.fill();
  },

  circle: function (
    canvas: Canvas,
    ctx: CanvasRenderingContext2D,
    { color = "#000" }: Layer
  ) {
    ctx.beginPath();
    ctx.ellipse(
      canvas.width / 2,
      canvas.height / 2,
      canvas.width * 0.45,
      canvas.height * 0.45,
      0,
      0,
      2 * Math.PI
    );
    ctx.closePath();
    ctx.fillStyle = Color(color).rgb().string();
    ctx.fill();
  },

  linear: function (
    canvas: Canvas,
    ctx: CanvasRenderingContext2D,
    { color = "#000" }: Layer
  ) {
    // Create a linear gradient
    var gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);

    // Add three color stops
    gradient.addColorStop(0, Color(color).alpha(0).rgb().string());
    gradient.addColorStop(1, Color(color).rgb().string());

    // Set the fill style and draw a rectangle
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  },
  radial: function (
    canvas: Canvas,
    ctx: CanvasRenderingContext2D,
    { color = "#000" }: Layer
  ) {
    // Create a linear gradient
    var gradient = ctx.createRadialGradient(
      canvas.width / 2,
      canvas.height / 2,
      0,
      canvas.width / 2,
      canvas.height / 2,
      Math.min(canvas.width, canvas.height)
    );

    // Add three color stops
    gradient.addColorStop(0, Color(color).rgb().string());
    gradient.addColorStop(1, Color(color).alpha(0).rgb().string());

    // Set the fill style and draw a rectangle
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  },
};

export default shapes;
