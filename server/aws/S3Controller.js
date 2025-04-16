import {
  GetObjectCommand,
  DeleteObjectCommand,
  DeleteObjectsCommand,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";

const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");


const s3Clients = require("./S3Clients.js");

async function deleteFullImageFromS3(params) {
  await s3Clients.s3FullClient.send(new DeleteObjectCommand(params));
}

async function deleteThumbnailImageFromS3(params) {
  await s3Clients.s3ThumbnailClient.send(
    new DeleteObjectCommand(params)
  );
}

async function deleteAllFullImagesFromS3(params) {
  await s3Clients.s3FullClient.send(new DeleteObjectsCommand(params));
}

async function deleteAllThumbnailImagesFromS3(params) {
  await s3Clients.s3ThumbnailClient.send(new DeleteObjectsCommand(params));
}


async function checkHeadObject(params){
  
  
  // creates the command to request for thumbnail metadata
  const headObject = await new HeadObjectCommand(params);

  //temp solution to check if the thumbnail exists
  for (let i = 0; i < 5; i++) {
    const exists = await s3Clients.s3ThumbnailClient
      .send(headObject)
      .catch((err) => console.log(err));

    if (exists) {
      break;
    }
    await new Promise((r) => setTimeout(r, 1500));
  }


}

async function getSignedThumbnailURL(params){

  const url = await getSignedUrl(
    s3Clients.s3ThumbnailClient,
    new GetObjectCommand(params),
    { expiresIn: 90000 }
  ); 
  return url

}

async function getObject(params){
  const object = await s3Clients.s3FullClient.send(
    new GetObjectCommand(params)
  );
  return object;
  
}
export {
  deleteFullImageFromS3,
  deleteThumbnailImageFromS3,
  deleteAllFullImagesFromS3,
  deleteAllThumbnailImagesFromS3,
  checkHeadObject,
  getSignedThumbnailURL,
  getObject}
;
