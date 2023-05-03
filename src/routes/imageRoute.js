const express = require("express");
const imageRouter = express.Router();
const multer = require('multer');
const {
  getImages,
  getImageDetails,
  getImageComments,
  getStatusSave,
  createImage,
  uploadImage,
  commentImage,
  searchImages,
  deleteImage
} = require("../controllers/imageController");
const { authentication } = require("../controllers/authController");

// GET
imageRouter.get("/get-images", getImages);
imageRouter.get("/search-images", searchImages);
imageRouter.get("/image-details/:id", getImageDetails);
imageRouter.get("/image-comments/:id", getImageComments);
imageRouter.get("/image-save/:id", authentication, getStatusSave);

// POST
const storage = multer.diskStorage({
      destination: (req, file, callback) => callback(null, process.cwd() + "/public/imgs_compress"),
      
      filename: (req, file, callback) => {
        let newName = Date.now() + "_" + file.originalname;
        // req.newName = newName;
        callback(null, newName);
      },
    });
const upload = multer({ storage });
imageRouter.post("/upload-image", authentication);
imageRouter.post("/upload-image", upload.single("fileUpload"), uploadImage);
imageRouter.post("/create-image", authentication, createImage);
imageRouter.post("/comment-image/:id", authentication, commentImage);

// DELETE
imageRouter.delete('/delete-image/:id', authentication, deleteImage)

module.exports = imageRouter;
