import ImageKey from "../models/image-model.js";
import path from "path";
import fs from "fs";
import canvas from "canvas"

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
}

//TODO: Find a better name for frameScale / sizeDown
export default async function generateWallpapers(user_id, user_directory_images, user_directory_wallpapers, canvasWidth, canvasHeight, frameScale, fileType, colour){

  //these should be set in req.body


  try {
    // ADD AT THE END WHEN CLEARING WALLPAPER AND IMAGE FOLDER
    //delete all files in the wallpaper folder
    
    
    const keys = await ImageKey.find({ user_id });

    for (let i = 0; i < keys.length; i++) {
      const canvas = createCanvas(canvasWidth, canvasHeight);
      const context = canvas.getContext("2d");


      let image = await loadImage(user_directory_images + keys[i].key).then((image) => {
        return image;
      });


      const landscape = image.width > image.height ? true : false; // true if the image is landscape, false if it is a portrait image. used to calculate the border size

      const imageWidth = image.width;
      const imageHeight = image.height;

      const translatedImageSize = {
        w: landscape ? canvasWidth / frameScale : canvasHeight / frameScale, //(image.width / image.height) * (canvasHeight / sizeDown),
        h: landscape
          ? (image.height / image.width) * (canvasWidth / frameScale)
          : (image.height / image.width) * (canvasHeight / frameScale), //  canvasHeight / sizeDown ,
      };
      const { w, h } = translatedImageSize;

      const imagePosition = {
        x: canvasWidth / 2 - w / 2,
        y: canvasHeight / 2 - h / 2,
      };
      const { x, y } = imagePosition;

      if (colour != "average") {
        context.fillStyle = colour;
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
        user_directory_wallpapers +
        keys[i].key.replace(/\.[^/.]+$/, ".") +
        fileType,
        buffer
      );
      
    }
  } catch (err) {
      console.log(err)
  }
};
