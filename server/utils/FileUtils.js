import fs from "fs";
import path from "path";
import { getUserPath } from "./UserPaths.js";


export function emptyDirectory(path) {
  
  if (!directoryExists(path)) {

    throw new Error("Can't empty directory. Directory does not exist");
  }


  fs.readdir(path, (err, files) => {
    if (err) {
      throw new Error(err);
    }

    for (const file of files) {
      if (fs.lstatSync(path + file).isFile()) {
        fs.unlink(path + file, (err) => {
          if (err) console.log(err);
        });
      }
    }
  });
};

export function directoryExists(path) {

  if (fs.existsSync(path)) {
    return true;
  }
  return false;
}
export function makeDirectory(path) {

  fs.mkdirSync(path, { recursive: true });

  return true;
}

export function fileExists(path) {
  if (fs.existsSync(path)) {
    return true;
  }
  else {
    return false;
  }
}

export function deleteFile(path) {
  console.log(path)
  fs.unlink(path, (err) => {
    if (err) console.log(err);
  });
}
export function initializeUser(user_id){

  makeDirectory(getUserPath(user_id, 'images'));
  makeDirectory(getUserPath(user_id, 'wallpapers'));
  makeDirectory(getUserPath(user_id, 'thumbnails'));


}
export function deleteDirectory(path){
  fs.rmdirSync(path, {recursive:true});

  return true;
}