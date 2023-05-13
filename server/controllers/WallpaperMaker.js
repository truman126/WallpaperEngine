const ImageKey = require("../models/image-model");
const {
  createCanvas,
  loadImage,
  drawImage,
  getImageData,
  setFillColor,
} = require("canvas");
const fs = require("fs");

const average = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length;
function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
}

const sizeDown = 2;

async function generateWallpapers(req, res) {

  //these should be set in req.body
  const canvasWidth = req.body.size.width;
  const canvasHeight = req.body.size.height;
  try {
    const keys = await ImageKey.find();


    for (let i = 0; i < keys.length; i++) {

      const canvas = createCanvas(canvasWidth, canvasHeight);
      const context = canvas.getContext("2d");

      let image = await loadImage("./data/images/" + keys[i].key).then((image) => {
        return image;
      });

        const imageWidth = image.width;
        const imageHeight = image.height;

        const imagePosition = {
          w: imageWidth / sizeDown,
          h: imageHeight / sizeDown,
          x: canvasWidth / 2 - imageWidth / sizeDown / 2,
          y: canvasHeight / 2 - imageHeight / sizeDown / 2,
        };
        const { w, h, x, y } = imagePosition;

        /**
         *
         * Find the average Colour of the image
         */

        //in memory canvas to get the image data
        const dataCanvas = createCanvas(canvasWidth, canvasHeight);
        var imgDataContext = dataCanvas.getContext("2d");
        imgDataContext.drawImage(image, 0, 0);
        var imageData = imgDataContext.getImageData(0, 0, w, h);
        var pix = imageData.data;

        // Loop over each pixel and invert the color.
        let rgb = { r: 0, g: 0, b: 0, a: 0 };
        let count = 0;

        for (var j = 0, n = pix.length; j < n; j += 4) {
          count++;
          rgb.r += pix[j]; //red
          rgb.g += pix[j + 1]; // green
          rgb.b += pix[j + 2]; // blue
          rgb.a += pix[j + 3]; // blue

          // i+3 is alpha (the fourth element)
        }

        rgb.r = ~~(rgb.r / count);
        rgb.g = ~~(rgb.g / count);
        rgb.b = ~~(rgb.b / count);
        rgb.a = ~~(rgb.b / count);

        context.fillStyle = rgbToHex(rgb.r, rgb.g, rgb.b);
        context.fillRect(0, 0, canvasWidth, canvasHeight);

        context.drawImage(image, x, y, w, h);

        const buffer = canvas.toBuffer("image/jpeg");
        fs.writeFileSync("./data/wallpapers/" + keys[i].key, buffer);
      
    }
    res.status(200);
  } catch (e) {
    console.log(e);
    res.status(400);
  }
}

module.exports = {
  generateWallpapers,
};
