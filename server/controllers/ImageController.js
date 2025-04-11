const Downloader = require('./Downloader');
const FileUtils = require('./FileUtils');
const FileController = require('./FileController');
const WallpaperMaker = require('./WallpaperMaker');

const path = require("path");


async function createWallpapers(request, response) {


  const user_id = request.user._id;


  const user_directory_images = path.join(__dirname + '/../data/' + user_id + '/').toString();
  const user_directory_wallpapers = path.join(__dirname + '/../data/' + user_id + '/wallpapers/').toString();



  const canvasWidth = request.body.size.width;
  const canvasHeight = request.body.size.height;
  const frameScale = request.body.ratio;
  const fileType = request.body.filetype;
  const colour = request.body.colour;



  //Set up / Clean Directories
  try {
  console.log('trying to create dirs')

    if (!FileUtils.directoryExists(user_directory_images)) {
      await FileUtils.makeDirectory(user_directory_images)
    }
    if (!FileUtils.directoryExists(user_directory_wallpapers)) {
      await FileUtils.makeDirectory(user_directory_wallpapers)
    }

    // await FileUtils.emptyDirectory(user_directory_images)
    // await FileUtils.emptyDirectory(user_directory_wallpapers)

    // DAO download images
    await FileController.downloadImages(user_id, user_directory_images)
    
    // await new Promise(r => setTimeout(r, 2000));
    await WallpaperMaker.generateWallpapers(user_id, user_directory_images, user_directory_wallpapers, canvasWidth, canvasHeight, frameScale, fileType, colour)
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
  catch(error){
    console.log(error)
    response.status(500)
  }

  // FileUtils.emptyDirectory(user_directory_images)
  // FileUtils.emptyDirectory(user_directory_wallpapers)

}

module.exports = {createWallpapers}