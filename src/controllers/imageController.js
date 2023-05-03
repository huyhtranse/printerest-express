// const initModels = require("../models/init-models");
// const sequelize = require('../models/index');
const multer = require('multer');
const fs = require('fs');
const { PrismaClient } = require("@prisma/client");
const compress_images = require("compress-images");

const { descriptToken } = require("../config/jwt");
const {successCode ,failCode}=require('../config/response')

const prisma = new PrismaClient();

// upload start
// const storage = multer.diskStorage({
//   destination: (req, file, callback) => callback(null, process.cwd() + "/public/imgs_compress"),

//   filename: (req, file, callback) => {
//     let newName = Date.now() + "_" + file.originalname;
//     callback(null, newName);
//   },
// });
// const upload = multer({ storage });
// upload end

// GET
const getImages = async (req, res) => {
  try {
    let data = await prisma.images.findMany();

    res.status(200).send(data);
  } catch (err) {
    res.status(500).send("Lỗi BE");
  }
};

const getImageDetails = async (req, res) => {
  try {
    let { id } = req.params;
    let data = await prisma.images.findMany({
      where: {
        image_id: +id,
      },
      include: {
        users: true,
      },
    });

    res.status(200).send(data);
  } catch (err) {
    res.status(500).send("Lỗi BE");
  }
};

const getImageComments = async (req, res) => {
  try {
    let { id } = req.params;
    let data = await prisma.images.findMany({
      where: {
        image_id: +id,
      },
      include: {
        comments: true,
      },
    });

    res.status(200).send(data);
  } catch (err) {
    res.status(500).send("Lỗi BE");
  }
};

const getStatusSave = async (req, res) => {
  try {
    let { token } = req.headers;
    let { id } = req.params;

    let decodeToken = descriptToken(token);
    let { user_id } = decodeToken.data;

    let data = await prisma.storage.findMany({
      where: {
        image_id: +id,
        user_id: +user_id
      }
    });

    res.status(200).send(data);
  } catch (err) {
    res.status(500).send("Lỗi BE");
  }
};

const uploadImage = async (req, res) => {
  // compress
  const data = await compress_images(
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
          // let fileBase = `data:${file.mimetype};base64,${Buffer.from(
          //   data
          // ).toString("base64")}`;

          // fs.unlink(
          //   process.cwd() + "/public/imgs/" + req.file.filename,
          //   (err) => {}
          // );
          fs.unlink(
            process.cwd() + "/public/imgs_compress/" + req.file.filename,
            (err) => {}
          );

          successCode(res, statistic, req.file.filename)
        });
      }
    }
  );
};

const createImage = async (req, res) => {
  try {
    let { token } = req.headers;
    let decodeToken = descriptToken(token);
    let { user_id } = decodeToken.data;

    const { name, descr, path } = req.body;
    // INSERT INTO VALUES
    const newData = {
      name,
      path,
      descr,
      user_id,
    };

    const data = await prisma.images.create({ data: newData });

    successCode(res, data, "The Image Uploaded");
  } catch (err) {
    failCode(res);
  }
};

const commentImage = async (req, res) => {
  try {
    const { token } = req.headers;
    const { id } = req.params;
    const decodeToken = descriptToken(token);
    const { user_id } = decodeToken.data;

    const {date, content} = req.body;

    const newData = { image_id: +id, user_id, date, content };
    const data = await prisma.comments.create({ data: newData });

    successCode(res, data, "The comment posted");
  } catch (error) {
    failCode(res);
  }
};

const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteComments = prisma.comments.deleteMany({
      where: {
        image_id: +id
      }
    });
    const deleteStorage = prisma.storage.deleteMany({
      where: {
        image_id: +id
      }
    });
    const deleteImage = prisma.images.deleteMany({
      where: {
        image_id: +id
      }
    });

    const transaction = await prisma.$transaction([deleteComments, deleteStorage, deleteImage])
    successCode(res, transaction, "The image deleted.");
  } catch (error) {
    failCode(res);
  }
};

const removeImage = async (req, res) => {
  let { id } = req.params;

  await prisma.images.delete({
    where: {
      image_id: id,
    },
  });
  res.status(200).send("done");
};

const searchImages = async (req, res) => {
  let { keyword } = req.query;
  let data = await prisma.images.findMany({
    where: {
      name: {
        contains: keyword,
      },
    },
  });

  res.status(200).send(data);
};

module.exports = {
  getImages,
  getImageDetails,
  getImageComments,
  getStatusSave,
  uploadImage,
  createImage,
  commentImage,
  removeImage,
  searchImages,
  deleteImage
};
