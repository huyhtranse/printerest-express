const express = require("express");
const imageRouter = express.Router();

const {
  getImages,
  getImageDetails,
  getImageComments,
  getStatusSave,
  createImage,
  searchImages,
} = require("../controllers/imageController");
const { authentication } = require("../controllers/authController");

// GET
imageRouter.get("/get-images", getImages);
imageRouter.get("/search-images", searchImages);
imageRouter.get("/image-details/:id", getImageDetails);
imageRouter.get("/image-comments/:id", getImageComments);
imageRouter.get("/image-save/:imageId/user/:userId", authentication, getStatusSave);

// POST
imageRouter.post("/create-image", createImage);
imageRouter.post("/create-image", createImage);


module.exports = imageRouter;
