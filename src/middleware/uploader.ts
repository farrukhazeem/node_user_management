import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/"); 
    },
    filename: function (req, file, cb) {
        const uniqueFilename = `${Date.now()}-${path.extname(file.originalname)}`;

      cb(null, uniqueFilename); 
    }

  });
  
  const upload = multer({ storage: storage });

  export { upload };