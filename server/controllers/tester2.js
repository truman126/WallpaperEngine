// Get the CanvasPixelArray from the given coordinates and dimensions.
const { createCanvas, loadImage, getImageData } = require('canvas');

var imgd = context.getImageData(x, y, width, height);
var pix = imgd.data;

// Loop over each pixel and invert the color.
for (var i = 0, n = pix.length; i < n; i += 4) {
    pix[i  ] = 255 - pix[i  ]; // red
    pix[i+1] = 255 - pix[i+1]; // green
    pix[i+2] = 255 - pix[i+2]; // blue
    // i+3 is alpha (the fourth element)
}

// Draw the ImageData at the given (x,y) coordinates.
context.putImageData(imgd, x, y);
console.log(imgd)
