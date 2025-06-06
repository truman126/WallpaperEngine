import AWSDAO from './AWSDAO.js';
import LocalDAO from './LocalDAO.js';


export default function DAO() {
    const DAOType = process.env.DAO_TYPE;

    if (DAOType == 'AWS') {
        //use AWS
        const awsCredentials = {
            AWS_S3_BUCKET_NAME_RESIZED: process.env.AWS_S3_BUCKET_NAME_RESIZED,
            AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME
        }
        return AWSDAO
    }
    else {
        return LocalDAO;
    }

}