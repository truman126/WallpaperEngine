import { getUserPath } from './UserPaths.js';
import { createRequire } from "module";
import fs from "fs";

const require = createRequire(import.meta.url);

const { createCanvas, loadImage, Image } = require('canvas');

export default async function ThumbnailCreator(path, thumbnailPath, key) {
    try{
    
    let image = await loadImage(path).then((img) => {
        return img;
    });
    
    let imageHeight;
    let imageWidth;
    if (image.width > image.height) {
        imageWidth = 100;
        imageHeight = image.height / image.width * 100;
    } else {
        imageHeight = 100;
        imageWidth = image.width / image.height * 100;
    }

    const canvas = createCanvas(imageWidth, imageHeight);
    const context = canvas.getContext("2d");

    await context.drawImage(image, 0, 0, imageWidth, imageHeight);

    const buffer = canvas.toBuffer('image/jpeg');

    await fs.writeFileSync(
        thumbnailPath +
        key,
        buffer
    );

    }catch(err){
        console.log(err)
    }

}