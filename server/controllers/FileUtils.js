const fs = require("fs");
const path = require("path");

emptyDirectory = async (req, res, next) => {
    const user_id = req.user._id;
    const directory = `./data/${user_id}/`;
    const wallpaper_dir = directory + "wallpapers";
  
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory);
      next();
    }
    
    fs.readdir(directory, (err, files) => {
      if (err) {
        console.log(err);
        console.log(1);
  
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



  directoryCheck = async (req, res, next) => {
    const user_id = req.user._id;
    const directory = `./data/${user_id}`;
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory);
      fs.mkdirSync(directory + "/wallpapers");
    }
  
    next();
  };

  module.exports = {emptyDirectory, directoryCheck};