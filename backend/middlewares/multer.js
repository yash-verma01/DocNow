// import multer from 'multer'
// const storage = multer.diskStorage({
// filename: function(req,file,callback){
// callback(null, file.originalname)
// }
// })
// const upload = multer({storage})

// export default upload


import multer from 'multer'
import fs from 'fs'

// Ensure uploads folder exists
const uploadPath = 'uploads/';
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath); // 👈 file kaha save hogi
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName); // 👈 unique naam file ka
  }
});

const upload = multer({ storage });

export default upload;
