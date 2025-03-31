const ImageKey = require("../models/image-model");
const path = require("path");
const fs = require("fs");

const {
  createCanvas,
  loadImage,
  drawImage,
  getImageData,
  setFillColor,
} = require("canvas");

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
}

generateWallpapers = async (req, res, next) => {

  //these should be set in req.body
  const canvasWidth = req.body.size.width;
  const canvasHeight = req.body.size.height;
  const sizeDown = req.body.ratio;

  const user_id = req.user._id;

  try {
    // ADD AT THE END WHEN CLEARING WALLPAPER AND IMAGE FOLDER
    //delete all files in the wallpaper folder
    const directory = path.join(__dirname + '/../data/' + user_id + '/').toString();
    
    const keys = await ImageKey.find({ user_id });

    for (let i = 0; i < keys.length; i++) {
      const canvas = createCanvas(canvasWidth, canvasHeight);
      const context = canvas.getContext("2d");


      let image = await loadImage(directory + keys[i].key).then((image) => {
        return image;
      });


      const landscape = image.width > image.height ? true : false; // true if the image is landscape, false if it is a portrait image. used to calculate the border size

      const imageWidth = image.width;
      const imageHeight = image.height;

      const translatedImageSize = {
        w: landscape ? canvasWidth / sizeDown : canvasHeight / sizeDown, //(image.width / image.height) * (canvasHeight / sizeDown),
        h: landscape
          ? (image.height / image.width) * (canvasWidth / sizeDown)
          : (image.height / image.width) * (canvasHeight / sizeDown), //  canvasHeight / sizeDown ,
      };
      const { w, h } = translatedImageSize;

      const imagePosition = {
        x: canvasWidth / 2 - w / 2,
        y: canvasHeight / 2 - h / 2,
      };
      const { x, y } = imagePosition;

      if (req.body.colour != "average") {
        context.fillStyle = req.body.colour;
      }

      else {

        /**
         *
         * Find the average Colour of the image
         */

        //in memory canvas to get the image data
        const dataCanvas = createCanvas(imageWidth, imageHeight);
        var imgDataContext = dataCanvas.getContext("2d");

        await imgDataContext.drawImage(image, 0, 0);

        var imageData = imgDataContext.getImageData(
          0,
          0,
          imageWidth,
          imageHeight
        );
        var pix = imageData.data;

        // Loop over each pixel and invert the color.
        let rgb = { r: 0, g: 0, b: 0, a: 0 };
        let count = 0;
        console.log(pix.length)
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



      }


      context.fillRect(0, 0, canvasWidth, canvasHeight);
      await context.drawImage(image, x, y, w, h);

      const buffer = canvas.toBuffer('image/jpeg');

      await fs.writeFileSync(
        directory +
        "wallpapers/" +
        keys[i].key.replace(/\.[^/.]+$/, ".") +
        req.body.filetype,
        buffer
      );

    }
    next();
  } catch (e) {
    console.log(e);
    res.status(400);
  }
};

module.exports = {
  generateWallpapers,
};
