const ImageKey = require("../models/image-model");
const path = require("path");
const fs = require("fs");
const admz = require("adm-zip");

sendDownload = async (req, res, next) => {
  console.log("starting to make download")
  const user_id = req.user._id;
  const wallpaperDirectory = `./data/${user_id}/wallpapers/`
  try {
    var to_zip = fs.readdirSync(wallpaperDirectory);

    console.log(to_zip)
    const zp = new admz();

    for (let k = 0; k < to_zip.length; k++) {
      zp.addLocalFile(wallpaperDirectory + to_zip[k]);
    }

    const file_after_download = "downloaded_file.zip";

    await zp.writeZip(file_after_download)
    const data = zp.toBuffer();


    console.log("getting ready to send")


    res.set("Content-Type", "application/octect-stream");
    res.set(
      "Content-Disposition",
      `attachment; filename=${file_after_download}`
    );
    res.set("Content-Length", data.length);
    console.log("sending")
    res.send(data);
    res.status(200)


  } catch (e) {
    console.log(e);
    res.status(401)
  }
};

module.exports = {
  sendDownload,
};
