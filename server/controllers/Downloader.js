const ImageKey = require("../models/image-model");
const path = require("path");
const fs = require("fs");
const admz = require("adm-zip");


// POST '/api/submit'
sendZipDownloadToClient = async (req, res, next) => {


  const userId = req.user._id;

  // Directory where the users wallpapers are stored
  const wallpaperDirectory = `./data/${userId}/wallpapers/`
  const zipFileName = 'wallpaper.zip'
  try {

    // Discovers all the files in the local wallpaper directory
    // Anything in to_
    var wallpapersToAddToZip = fs.readdirSync(wallpaperDirectory);

    // Adds all the wallpapers to a zip file
    const zipFile = new admz();
    for (let i = 0; i < wallpapersToAddToZip.length; i++) {
      zipFile.addLocalFile(wallpaperDirectory + wallpapersToAddToZip[i]);
    }

    // Writes the zip file locally to the backend
    await zipFile.writeZip(zipFileName)
    const data = zipFile.toBuffer();

    // Sends the local zip file to the client
    res.set("Content-Type", "application/octect-stream");
    res.set(
      "Content-Disposition",
      `attachment; filename=${zipFileName}`
    );
    res.set("Content-Length", data.length);
    res.send(data);
    res.status(200)


  } catch (error) {
    console.log(error)
    res.status(401)
  }
};

module.exports = {
  sendZipDownloadToClient,
};
