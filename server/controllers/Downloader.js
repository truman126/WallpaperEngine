const ImageKey = require("../models/image-model");
const path = require("path");
const fs = require("fs");
const admz = require("adm-zip");

getDownload = async (req, res) => {
  try {
    var to_zip = fs.readdirSync("./data/wallpapers/");

    res.sendFile(__dirname + "/" + "index.html");

    const zp = new admz();

    for (let k = 0; k < to_zip.length; k++) {
      zp.addLocalFile("./data/wallpapers/" + to_zip[k]);
    }

    const file_after_download = "downloaded_file.zip";

    const data = zp.toBuffer();

    res.set("Content-Type", "application/octect-stream");
    res.set(
      "Content-Disposition",
      `attachment; filename=${file_after_download}`
    );
    res.set("Content-Length", data.length);
    res.send(data);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getDownload,
};

// const dir = "./data/wallpapers/";
//     fs.unlink(path.join(dir, "wallpapers.zip"), err => {
//       if (err) console.log(err);
//   });

//     const output = fs.createWriteStream("./data/" + "/wallpapers.zip");
//     const archive = archiver("zip", {
//       zlib: { level: 9 }, // Sets the compression level.
//     });

//     fs.readdir(dir, (err, files) => {
//       if (err) console.log(err);
//       for (const f of files) {
//         console.log(f);
//         archive.append(
//           fs.createReadStream(dir + f),
//           { name: f }
//         );

//         console.log("should be filed");
//       }
//       archive.pipe(output);

//       archive.finalize();
//     });

//     res.writeHead(200, {
//       "Content-Type": "application/zip",
//       "Content-disposition": "attachment; filename=" +  "/data/wallpapers.zip",
//     });
//     res.end('ok');
