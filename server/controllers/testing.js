const {
  createCanvas,
  loadImage,
  drawImage,
  getImageData,
  setFillColor
} = require("canvas");
const fs = require("fs");

const sizeDown = 3;
const imageWidth = 1818;
const imageHeight = 1228;
const canvasWidth = 1920;
const canvasHeight = 1080;
const canvas = createCanvas(canvasWidth, canvasHeight);
const context = canvas.getContext("2d");

const imagePosition = {
  w: imageWidth / sizeDown,
  h: imageHeight / sizeDown,
  x: canvasWidth / 2 - imageWidth / sizeDown / 2,
  y: canvasHeight / 2 - imageHeight / sizeDown / 2,
};

const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;
function rgbToHex(r, g, b) {
  return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}


loadImage("./3x.jpg")
  .then((image) => {
    const { w, h, x, y } = imagePosition;

    /**
     *
     * Find the average Colour of the image
     */

    //in memory canvas to get the image data
    const dataCanvas = createCanvas(canvasWidth, canvasHeight);
    var imgDataContext = dataCanvas.getContext("2d");
    imgDataContext.drawImage(image, 0, 0);
    var imageData = imgDataContext.getImageData(0,0, w, h);
    var pix = imageData.data;

    // Loop over each pixel and invert the color.
    let rgb = {r:0,g:0,b:0, a:0}
    let count = 0;

    for (var i = 0, n = pix.length; i < n; i += 4) {
      count++;
      rgb.r += pix[i]; //red
      rgb.g += pix[i + 1]; // green
      rgb.b += pix[i + 2]; // blue
      rgb.a += pix[i + 3]; // blue

      // i+3 is alpha (the fourth element)
    }

    rgb.r = ~~(rgb.r/count);
    rgb.g = ~~(rgb.g/count);
    rgb.b = ~~(rgb.b/count);
    rgb.a = ~~(rgb.b/count);


    context.fillStyle = rgbToHex(rgb.r,rgb.g,rgb.b)
    context.fillRect(0, 0, 1920, 1080);

    

    context.drawImage(image, x, y, w, h);

    const buffer = canvas.toBuffer("image/jpeg");

    fs.writeFileSync("./3x.jpeg", buffer);
  })
  .catch((error) => console.log(error));
