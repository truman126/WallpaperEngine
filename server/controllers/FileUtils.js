const fs = require("fs");
const path = require("path");

emptyDirectory = (req, res, next) => {
  const user_id = req.user._id;
  const directory = path.join(__dirname + '/../data/' + user_id + '/').toString();

  const wallpaper_dir = directory + "wallpapers";
  console.log("checking if the directory exists")
  if (!fs.existsSync(directory)) {
    console.log('doesnt exists')
    fs.mkdirSync(directory);
    next();

  }
  console.log("directory exists and needs to be emptied")
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.log("the error is:", err);
      return;
    }

    for (const file of files) {
      fs.unlink(path.join(directory, file), (err) => {
        if (err) console.log(err);
      });
    }
  });
  if (!fs.existsSync(wallpaper_dir)) {
    fs.mkdirSync(wallpaper_dir);
    next();
  }
  fs.readdir(wallpaper_dir, (err, files) => {
    if (err) {
      console.log(err);

      return;
    }

    if (!files) {
      next()
    }
    for (const file of files) {
      fs.unlink(path.join(wallpaper_dir, file), (err) => {
        if (err) console.log(err);
      });
    }
  });
  next();
};



directoryCheck = (req, res, next) => {
  const user_id = req.user._id;
  const directory = path.join(__dirname + '/../data/' + user_id + '/').toString();

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
    fs.mkdirSync(directory + "wallpapers");
  }

  next();
};

module.exports = { emptyDirectory, directoryCheck };