const express = require("express");
const userRouter = express.Router();
const multer = require("multer");
const fs = require('fs');
const compress_images = require("compress-images");
const { getUser, getImagesCreate, getImagesSave, createUser, loginUser, signupUser, changeInfo } = require("../controllers/userController");
const { authentication } = require("../controllers/authController");

// upload start
const storage = multer.diskStorage({
  destination: (req, file, callback) => callback(null, process.cwd() + "/public/imgs_compress"),

  filename: (req, file, callback) => {
    let newName = Date.now() + "_" + file.originalname;
    callback(null, newName);
  },
});
const upload = multer({ storage });
// upload end

userRouter.get("/get-user", authentication, getUser);
userRouter.get("/get-images-create/:id", authentication, getImagesCreate);
userRouter.get("/get-images-save/:id", authentication, getImagesSave);

userRouter.post("/create-user", authentication, createUser);
userRouter.post('/login', loginUser);
userRouter.post('/signup', signupUser);

userRouter.post("/upload-avatar", upload.single("fileUpload"), async (req, res) => {
  let file = req.file;

  // compress
  await compress_images(
    `${process.cwd()}/public/imgs_compress/${req.file.filename}`,
    "./public/imgs/",
    { compress_force: false, statistic: true, autoupdate: true },
    false,
    { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
    { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
    { svg: { engine: "svgo", command: "--multipass" } },
    {
      gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] },
    },
    function (err, completed, statistic) {
      if (completed) {
        fs.readFile(statistic.path_out_new, (err, data) => {
          let fileBase = `data:${file.mimetype};base64,${Buffer.from(data).toString('base64')}`
      
          fs.unlink(process.cwd() + '/public/imgs/' + file.filename, (err) => {});
          fs.unlink(process.cwd() + '/public/imgs_compress/' + file.filename, (err) => {});
      
          res.send(fileBase);
        })
      }
    }
  );
});

// PUT
userRouter.put('/change-info', authentication, changeInfo);


module.exports = userRouter;
