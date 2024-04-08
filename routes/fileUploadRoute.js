import express from "express";
import multer from 'multer';
import {jsonFile} from '../model/fileUploadSchema.js'

const router = express.Router();

// image uploader folder
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './jsonfiles')
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({ storage })

// get user GET method
router.get('/files', async (req, res) => {
    try {
        const files = await jsonFile.find({})
        return res.status(200).json({
            const: files.length,
            files: files
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: error.message })
    }
})

// upload files
router.post('/uploadFile', upload.single('file'), async (req, res) => {
    const newInput = {
        message : null,
        file: req.file.filename
    }
    try {
        const files = await jsonFile.create(newInput)
        return res.status(201).send({ message: "Updated" })
    }
    catch (error) {
        console.log(error)
    }
})


// const store = new Store({
//   database: "dbFiles",
// });

// const db = "dbFiles";


// // Function to store file
// async function storeFile(filePath, fileName, bucket) {
//   return new Promise((resolve, reject) => {
//     const readStream = fs.createReadStream(filePath);
//     readStream.on("error", reject);
//     readStream
//       .pipe(bucket.openUploadStream(fileName))
//       .on("error", reject)
//       .on("finish", resolve);
//   });
// }

// // Function to retrieve file as JSON
// async function getFileAsJson(fileName, bucket) {
//   return new Promise((resolve, reject) => {
//     const writeStream = fs.createWriteStream(fileName);
//     writeStream.on("error", reject);
//     const readStream = bucket.openDownloadStreamByName(fileName);
//     readStream.on("error", reject);
//     readStream
//       .pipe(writeStream)
//       .on("error", reject)
//       .on("finish", () => {
//         fs.readFile(fileName, "utf8", (err, data) => {
//           if (err) {
//             reject(err);
//           } else {
//             resolve(data);
//           }
//           fs.unlink(fileName, (err) => {
//             if (err) {
//               console.error("Error deleting temporary file:", err);
//             }
//           });
//         });
//       });
//   });
// }

// router.post('/storeFile', async (req, res) => {
//     const { filePath, fileName } = req.body;
//     console.log(filePath, fileName)
//     if (!filePath || !fileName) {
//         res.status(400).send('Missing filePath or fileName');
//         return;
//     }
//     const db = await connectToMongoDB();
//     const bucket = new GridFSBucket(db);
//     try {
//         await storeFile(filePath, fileName, bucket);
//         res.send('File stored successfully');
//     } catch (error) {
//         console.error('Error storing file:', error);
//         res.status(500).send('Error storing file');
//     }
// });

// router.get('/getFileAsJson/:fileName', async (req, res) => {
//     const fileName = req.params.fileName;
//     const db = await connectToMongoDB();
//     const bucket = new GridFSBucket(db);
//     try {
//         const fileData = await getFileAsJson(fileName, bucket);
//         res.json({ fileData });
//     } catch (error) {
//         console.error('Error retrieving file:', error);
//         res.status(500).send('Error retrieving file');
//     }
// });

export default router;
