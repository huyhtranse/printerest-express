// const initModels = require("../models/init-models");
// const sequelize = require('../models/index');

const { PrismaClient } = require("@prisma/client");
const { descriptToken } = require("../config/jwt");

const prisma = new PrismaClient();

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
    let { imageId, userId } = req.params;
    let data = await prisma.storage.findMany({
      where: {
        image_id: +imageId,
        user_id: +userId
      }
    });

    res.status(200).send(data);
  } catch (err) {
    res.status(500).send("Lỗi BE");
  }
};

const createImage = async (req, res) => {
  try {
    let { token } = req.headers;
    let decodeToken = descriptToken(token);
    let { user_id } = decodeToken.data;

    const { name, path, descr } = req.body;

    // INSERT INTO VALUES
    let newData = {
      name,
      path,
      descr,
      user_id,
    };

    let data = await prisma.images.create({ data: newData });

    // console.log(data);

    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

const commentImage = async (req, res) => {
  try {
    const { imageId, userId } = req.params;
    const { date, content } = req.body;

    const newData = { image_id: +imageId, user_id: +userId , date, content };
    const data = await prisma.comments.create({data: newData});

    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error.message);
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
    res.status(200).send(transaction);
  } catch (error) {
    res.status(500).send(error.message);
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
  createImage,
  commentImage,
  removeImage,
  searchImages,
  deleteImage
};
