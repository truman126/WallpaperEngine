import ImageKey from "../models/image-model.js";
import path from "path";
import fs from "fs";
import admz from "adm-zip";


// POST '/api/submit'
export default async function createZipFile(pathToMake, pathToPack) {

  // Directory where the users wallpapers are stored
  const zipFileName = pathToMake + 'wallpapers.zip'

  // Discovers all the files in the local wallpaper directory
  // Anything in to_
  var wallpapersToAddToZip = fs.readdirSync(pathToPack);

  // Adds all the wallpapers to a zip file
  const zipFile = new admz();
  for (let i = 0; i < wallpapersToAddToZip.length; i++) {
    zipFile.addLocalFile(pathToPack + wallpapersToAddToZip[i]);
  }

  // Writes the zip file locally to the backend
  await zipFile.writeZip(zipFileName)
  const data = zipFile.toBuffer();
  return data;
};

