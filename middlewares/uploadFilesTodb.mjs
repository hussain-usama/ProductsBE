import { MongoClient, GridFSBucket } from 'mongodb'
import stream from 'stream'
import multer from 'multer'
import dotenv from 'dotenv'
dotenv.config();

const storage = multer.memoryStorage();
export const gridfsUpload = multer({ storage });

const uri = process.env.REACT_APP_DB_URI;
const dbName = "files";
const collectionName = "uploads"; // GridFS collection name


export async function uploadToGridFS(file, metadata) {
    const client = new MongoClient(uri);
    try {
        const db = client.db(dbName);
        const bucket = new GridFSBucket(db, { bucketName: collectionName });

        const uploadStream = bucket.openUploadStream(file.originalname, { metadata });
        const bufferStream = stream.Readable.from(file.buffer);

        const uploadPromise = new Promise((resolve, reject) => {
            bufferStream.pipe(uploadStream)
                .on('error', (err) => {
                    reject(err);
                })
                .on('finish', () => {
                    resolve(uploadStream.id);
                });
        });

        return uploadPromise;
    } catch (error) {
        throw error;
    }
}

export async function getAllDbFiles() {
    const client = new MongoClient(uri);
    const db = client.db(dbName);
    const filesCollection = db.collection(`${collectionName}.files`);
    const files = await filesCollection.find().toArray();
    return files;
}
