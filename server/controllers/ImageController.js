import Downloader from '../services/Downloader.js';
import {makeDirectory, emptyDirectory, directoryExists} from '../utils/FileUtils.js';
import generateWallpapers from '../services/WallpaperMaker.js';
import DAOFactory from '../services/DAOFactory.js';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import path from "path";


export default async function createWallpapers(request, response) {

  try {
    const user_id = request.user._id;

    const __dirname = dirname(fileURLToPath(import.meta.url));
    const user_directory_images = path.join(__dirname + '/../data/' + user_id + '/').toString();
    const user_directory_wallpapers = path.join(__dirname + '/../data/' + user_id + '/wallpapers/').toString();


    const canvasWidth = request.body.size.width;
    const canvasHeight = request.body.size.height;
    const frameScale = request.body.ratio;
    const fileType = request.body.filetype;
    const colour = request.body.colour;

    const DAO = new DAOFactory();


    //Set up / Clean Directories


    if (!directoryExists(user_directory_images)) {
      await makeDirectory(user_directory_images);
    }
    if (!directoryExists(user_directory_wallpapers)) {
      await makeDirectory(user_directory_wallpapers);

    }
    // await FileUtils.emptyDirectory(user_directory_images)
    // await FileUtils.emptyDirectory(user_directory_wallpapers)

    // DAO download images
    await DAO.downloadImages(user_id, user_directory_images)

    // await new Promise(r => setTimeout(r, 2000));
    await generateWallpapers(user_id, user_directory_images, user_directory_wallpapers, canvasWidth, canvasHeight, frameScale, fileType, colour)
    // await new Promise(r => setTimeout(r, 2000));

    const zipFile = await Downloader.createZipFile(user_directory_images);



    //send the zip file to the client
    response.set("Content-Type", "application/octect-stream");
    response.set(
      "Content-Disposition",
      `attachment; filename=wallpapers.zip`
    );
    response.set("Content-Length", zipFile.length);
    response.send(zipFile);
    response.status(200);
  }
  catch (error) {
    console.log(error)
    response.status(500)
  }

  // FileUtils.emptyDirectory(user_directory_images)
  // FileUtils.emptyDirectory(user_directory_wallpapers)

}