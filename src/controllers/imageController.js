// const initModels = require("../models/init-models");
// const sequelize = require('../models/index');
const { PrismaClient } = require("@prisma/client");

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
    const { name, path, descr, user_id } = req.body;

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

const updateFood = async (req, res) => {
  //UPDATE SET WHERE
  // Food.update(model, { where: { food_id } });
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
  updateFood,
  removeImage,
  searchImages,
};
