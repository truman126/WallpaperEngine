import createZipFile from '../services/Downloader.js';
import {makeDirectory, emptyDirectory, directoryExists, deleteFile} from '../utils/FileUtils.js';
import generateWallpapers from '../services/WallpaperMaker.js';
import DAOFactory from '../services/DAOFactory.js';

import path from "path";
import { getUserPath } from '../utils/UserPaths.js';


export default async function createWallpapers(request, response) {

  try {
    
    const user_id = request.user._id;

    const user_directory_images = getUserPath(user_id, 'images');
    const user_directory_wallpapers = getUserPath(user_id, 'wallpapers');
    

    const canvasWidth = request.body.size.width;
    const canvasHeight = request.body.size.height;
    const frameScale = request.body.ratio;
    const fileType = request.body.filetype;
    const colour = request.body.colour;

    const DAO = new DAOFactory();

    
    //Set up / Clean Directories

    

    // DAO download images
    let downloaded = await DAO.downloadImages(user_id, user_directory_images)

    

    // await downloaded


    // await new Promise(r => setTimeout(r, 2000));
    await generateWallpapers(user_id, user_directory_images, user_directory_wallpapers, canvasWidth, canvasHeight, frameScale, fileType, colour)
    // await new Promise(r => setTimeout(r, 2000));
  
    const zipFile = await createZipFile(getUserPath(user_id, 'base'), user_directory_wallpapers);



    //send the zip file to the client
    response.set("Content-Type", "application/octect-stream");
    response.set(
      "Content-Disposition",
      `attachment; filename=wallpapers.zip`
    );
    response.set("Content-Length", zipFile.length);
    response.status(200);
    response.send(zipFile);

    if(process.env.DAO_TYPE != 'LOCAL'){
      emptyDirectory(user_directory_images)
    }
    emptyDirectory(user_directory_wallpapers)
    deleteFile(getUserPath(user_id, 'base') + 'wallpapers.zip')
  }
  catch (error) {
    response.sendStatus(500)
  }

}