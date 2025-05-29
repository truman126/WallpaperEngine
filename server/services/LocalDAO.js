import fs from "fs";
import path from "path";
import ImageKey from "../models/image-model.js";
import { deleteFile, emptyDirectory, fileExists } from "../utils/FileUtils.js";
import { getUserPath } from "../utils/UserPaths.js";
import ThumbnailCreator from "../utils/ThumbnailCreator.js";



async function uploadImageKey(user_id, fileInfo) {
    console.log('multer should be done')
    if (!fileInfo) {
        throw new Error("no files")
    }

    /* This is the array of uploaded images. 
    Returns the mongo record of the image so that the thumbnail and name can be accessed.
    */
    let savedKeys = [];



    for (const file of fileInfo) {
        // let thumb_url = null;

        const keyName = file.filename;

        let newKey = new ImageKey({
            key: keyName,
            user_id,
            name: file.originalname,
            url: null,
        });

        newKey = await newKey.save();

        savedKeys.push(newKey);



    }
    return savedKeys;
};
async function deleteImage(user_id, file_id) {
    //Image id to delete

    // Delete the image from MongoDB
    const key = await ImageKey.findOne({ _id: file_id });

    // If no key exists when trying to delete in Mongo, throw error
    if (!key) {
        throw new Error("Image Key was not found and cannot be deleted.")
    }

    // Delete the full image and the thumbnail from S3
    deleteFile(getUserPath(user_id, 'images') + key.key)
    deleteFile(getUserPath(user_id, 'thumbnails') + key.key)

    // Respond with deleted key
    return true;



};
async function deleteAllImages(user_id) {
    const images = await ImageKey.find({ user_id });

    // No images, throw error
    if (!images) {
        throw new Error("Images were not found for this user.")
    }

    emptyDirectory(getUserPath(user_id, 'images'));
    emptyDirectory(getUserPath(user_id, 'thumbnails'));



    // Send response
    return true;
}
async function deleteImageKey(user_id, file_id) {
    const key = await ImageKey.findOneAndDelete({ _id: file_id });
    return key


};
async function deleteAllImageKeys(user_id) {
    // Deletes all the image keys associated with the user from MongoDB
    await ImageKey.deleteMany({ user_id });
    return true;

}
async function getAllImages(user_id) {

    const images = await ImageKey.find({ user_id });
    return images;


};
async function downloadImages(user_id) {

    //check if all images exist, no downloading needs to be done with this local DAO
    //this could be changed to return true
    const images = await ImageKey.find({ user_id });
    let allExist = true;
    console.log({ images })
    for (let image of images) {
        console.log({ image })
        const path = getUserPath(user_id, 'images');
        console.log(path)

        if (!fileExists(path + image.key)) allExist = false;
    }

    return allExist;


};

async function getThumbnail(userId, imageId) {

    if (!imageId || imageId === 'undefined') {
        throw new Error("no image id");
    }
    if (!userId || userId === 'undefined') {
        throw new Error("No user")
    }

    const imageKey = await ImageKey.findOne({ _id: imageId });
    const path = getUserPath(userId, 'images')

    const thumbnailPath = getUserPath(userId, 'thumbnails')

    //check if thumbnail exists
    if (!fileExists(thumbnailPath + imageKey.key)) {
        await ThumbnailCreator(path + imageKey.key, thumbnailPath, imageKey.key)
    }

    const updatedKey = await ImageKey.findOneAndUpdate(
        { _id: imageId },
        { $set: { url: 'http://localhost:8000/' + userId + '/thumbnails/' + imageKey.key } }
    );
    return updatedKey;
};

const LocalDAO = { uploadImageKey, deleteImage, deleteAllImages, deleteImageKey, deleteAllImageKeys, getAllImages, downloadImages, getThumbnail };

export default LocalDAO;

