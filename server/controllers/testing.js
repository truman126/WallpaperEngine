const { createCanvas, loadImage, drawImage } = require("canvas");
const fs = require("fs");

const sizeDown = 5;
imageWidth = 1818;
imageHeight = 1228;
const canvasWidth = 1920;
const canvasHeight = 1080;
const canvas = createCanvas(canvasWidth, canvasHeight);
const context = canvas.getContext("2d");

const imagePosition = {
  w: imageWidth / sizeDown,
  h: imageHeight / sizeDown,
  x: canvasWidth / 2 - this.w / 2,
  y: canvasHeight / 2 - this.h / 2,
};
context.fillStyle = "#123EEE";
const { w, h, x, y } = imagePosition;

context.fillRect(20, 10, 150, 100)

loadImage("smalldog.png")
  .then((image) => {
    const { w, h, x, y } = imagePosition;
    context.drawImage(image, x, y, w, h);

    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync("./image.png", buffer);
  })
  .catch((error) => console.log(error));
