import dotenv from 'dotenv';  // Import dotenv
dotenv.config();
import AWSDAO from './AWSDAO.js';


export default function DAO() {
    const DAOType = process.env.DAO_TYPE;

    if (DAOType == 'AWS') {
        //use AWS
        awsCredentials = {
            AWS_S3_BUCKET_NAME_RESIZED: process.env.AWS_S3_BUCKET_NAME_RESIZED,
            AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME
        }
        return new AWSDAO();
    }
    else {
        //use local, add other options here;
    }

}