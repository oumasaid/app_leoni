// upload.js
import fs from 'fs';
import path from 'path';
import multer from 'multer';


const currentFolder = process.cwd();
console.log('Current folder:', currentFolder);


// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${currentFolder}/uploads`);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage }).single('image');

export default upload;
