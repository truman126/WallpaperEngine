import fs from "fs";
import path from "path";


export function emptyDirectory(path){

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




export function directoryExists(path){

  if (fs.existsSync(path)){
    return true;
  }
  return false;
}
export function makeDirectory(path){

  fs.mkdirSync(path, {recursive:true});

  return true;
}