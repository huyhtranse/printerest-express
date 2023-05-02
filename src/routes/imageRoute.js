const express = require("express");
const imageRouter = express.Router();

const {
  getImages,
  getImageDetails,
  getImageComments,
  getStatusSave,
  createImage,
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
imageRouter.get("/image-save/:imageId/user/:userId", authentication, getStatusSave);

// POST
imageRouter.post("/create-image", authentication, createImage);
imageRouter.post("/comment-image/:imageId/user/:userId",authentication, commentImage);

// DELETE
imageRouter.delete('/delete-image/:id', authentication, deleteImage)

module.exports = imageRouter;
