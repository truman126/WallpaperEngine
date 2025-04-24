import fs from "fs";
import path from "path";

export default function FileUtils(){
function emptyDirectory(path){

  if(!directoryExists(path)){
    throw new Error("Can't empty directory. Directory does not exist");
  } 
  
  
  fs.readdir(path, (err, files) => {
    if (err) {
      throw new Error(err);
    }

    for (const file of files) {
      fs.unlink(path + file, (err) => {
        if (err) console.log(err);
      });
    }
  });
};




function directoryExists(path){

  if (fs.existsSync(path)){
    return true;
  }
  return false;
}
function makeDirectory(path){

  fs.mkdirSync(path);

  return true;
}}