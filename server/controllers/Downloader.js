const ImageKey = require("../models/image-model");
const path = require("path");
const fs = require("fs");
const archiver = require("archiver");

getDownload = async (req, res) => {

  try {
    const dir = "./data/wallpapers/";
    fs.unlink(path.join(dir, "wallpapers.zip"), err => {
      if (err) console.log(err);
  });

    const output = fs.createWriteStream("./data/" + "/wallpapers.zip");
    const archive = archiver("zip", {
      zlib: { level: 9 }, // Sets the compression level.
    });

    fs.readdir(dir, (err, files) => {
      if (err) console.log(err);
      for (const f of files) {
        console.log(f);
        archive.append(
          fs.createReadStream(dir + f),
          { name: f }
        );

        console.log("should be filed");
      }
      archive.pipe(output);

      archive.finalize();
    });

    res.writeHead(200, {
      "Content-Type": "application/zip",
      "Content-disposition": "attachment; filename=" +  "/data/wallpapers.zip",
    });
    res.end('ok');
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getDownload,
};
