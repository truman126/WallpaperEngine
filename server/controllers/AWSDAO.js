require("dotenv").config();
const fs = require("fs");
const path = require("path");
const ImageKey = require("../models/image-model");
const S3Controller = require("../aws/S3Controller");
const s3Clients = require("../aws/S3Clients.js");


export default function AWSDAO() {

    async function uploadImageKey(user_id, fileInfo) {

        const user_id = req.user._id;

        if (!req.files) {
            throw new Error("no files")
        }

        /* This is the array of uploaded images. 
        Returns the mongo record of the image so that the thumbnail and name can be accessed.
        */
        let savedKeys = [];


        try {

            for (file of req.files) {
                let thumb_url = null;
                const keyName = file.key;

                const bucketParams = {
                    Key: "thumbnails/resized-" + keyName,
                    Bucket: AWS_S3_BUCKET_NAME_RESIZED,
                };

                await S3Controller.checkHeadObject(bucketParams);

                thumb_url = await S3Controller.getSignedThumbnailURL(bucketParams);

                let newKey = new ImageKey({
                    key: keyName,
                    user_id,
                    name: file.originalname,
                    url: thumb_url != null ? thumb_url : "none",
                });

                newKey = await newKey.save();

                savedKeys.push(newKey);



            }
            return savedKeys;
        }
        catch (error) {
            throw new Error(error);
        }
    };
    async function deleteImage(user_id, file_id) {
        //Image id to delete


        // Delete the image from MongoDB
        const key = await ImageKey.find({ _id: file_id });

        // If no key exists when trying to delete in Mongo, throw error
        if (!key) {
            throw new Error("Image Key was not found and cannot be deleted.")
        }

        // Delete the full image and the thumbnail from S3
        try {
            const fullImageParams = {
                Bucket: AWS_S3_BUCKET_NAME,
                Key: key.key,
            };
            const thumbnailImageParams = {
                Bucket: AWS_S3_BUCKET_NAME_RESIZED,
                Key: "thumbnails/resized-" + key.key,
            };
            S3Controller.deleteFullImageFromS3(fullImageParams);
            S3Controller.deleteThumbnailImageFromS3(thumbnailImageParams);
        } catch (error) {
            throw new Error("AWS Error", error)
        }

        // Respond with deleted key
        return true;
    };
    async function deleteAllImages(user_id) {
        const images = await ImageKey.find({ user_id });

        // No images, throw error
        if (!images) {
            throw new Error("Images were not found for this user.")
        }
        // Create parameters for s3 deletion functions
        const fullImageDeleteParams = {
            Bucket: AWS_S3_BUCKET_NAME,
            Delete: { Objects: [] },
        };
        const thumbnailImageDeleteParams = {
            Bucket: AWS_S3_BUCKET_NAME_RESIZED,
            Delete: { Objects: [] },
        };

        // Loop through the mongo keys and add them to the S3 params
        for (image in images) {
            fullImageDeleteParams.Delete.Objects.push({ Key: images[image].key });
            thumbnailImageDeleteParams.Delete.Objects.push({
                Key: `thumbnails/resized-${images[image].key}`,
            });
        }

        // Delete all the S3 Full images and thumbnails
        try {
            S3Controller.deleteAllFullImagesFromS3(fullImageDeleteParams);
            S3Controller.deleteAllThumbnailImagesFromS3(thumbnailImageDeleteParams);
        } catch (error) {
            throw new Error("AWS Error in deleting image", error)
        }


        // Send response
        return true;
    }
    async function deleteImageKey(user_id, file_id) {
        try {
            await ImageKey.findOneAndDelete({ _id: file_id });
            return true;
        }
        catch (error) {
            throw new Error("Error in deleting mongo key", error);
        }

    };
    async function deleteAllImageKeys(user_id) {
        // Deletes all the image keys associated with the user from MongoDB
        try {
            await ImageKey.deleteMany({ user_id });
            return true;
        }
        catch (error) {
            throw new Error("Error deleting all image keys", error)
        }

    }
    async function getAllImages(user_id) {
        try {
            const images = await ImageKey.find({ user_id });
            return images;
        }
        catch (error) {
            throw new Error("Error getting all image keys", error);
        }

    };
    async function downloadImages(user_id, download_path) {

        // Function to send request for the object to S3 then pipe the data stream to a local directory
        try {
            const make_promise = async (key) => {
                const params = { Bucket: AWS_S3_BUCKET_NAME, Key: key }
                const { Body } = await S3Controller.getObject(params)
                return new Promise((resolve, reject) => {

                    const file = Body.pipe(
                        fs.createWriteStream(path + key)
                    );

                    file.on("finish", () => {
                        resolve(true);
                    });
                    file.on("error", reject);
                });
            };




            const images = await ImageKey.find({ user_id });

            // Having an array of promises for downloads allows for parallel downloads
            const promises = [];

            for (const image of images) {
                try {
                    promises.push(make_promise(image.key));
                } catch (e) {
                    console.log(e);
                }
            }
            const all = Promise.all(promises);

            all
                .then((values) => {
                    console.log("images downloaded")
                })
                .catch((error) => {
                    console.log(error); // rejectReason of any first rejected promise
                });

            return true;
        }
        catch (error) {
            throw new Error("Error in downloading images", error)
        }
    };
    //TODO:implement
    function getThumbnail() { };


}