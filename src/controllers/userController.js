const bcrypt = require("bcrypt");
const { PrismaClient } = require('@prisma/client')

const initModels = require("../models/init-models");
const sequelize = require("../models/index");
const { createToken,descriptToken } = require("../config/jwt");
const { successCode } = require("../config/response");

const model = initModels(sequelize);
const prisma = new PrismaClient();

const getUser = async (req, res) => {
  try {
    let { token } = req.headers;
    let decodeToken = descriptToken(token);
    let { user_id } = decodeToken.data;

    // using prisma
    let data = await prisma.users.findMany({
      where: {
        user_id
      }
    });

    successCode(res, data, "get user success");
  } catch (err) {
    res.status(401).send(err.message);
  }
};

const getImagesCreate = async (req, res) => {
  try {
    let { id } = req.params;

    // using prisma
    let data = await prisma.users.findMany({
      where: {
        user_id: +id
      },
      include: {
        images: true
      }
    });

    successCode(res, data, "get user success");
  } catch (err) {
    res.status(401).send(err.message);
  }
};

const getImagesSave = async (req, res) => {
  try {
    let { id } = req.params;

    // using prisma
    let data = await prisma.users.findMany({
      where: {
        user_id: +id
      },
      include: {
        storage: {
          select: {
            images: true
          }
        },
        // select: image_id
      }
    });

    successCode(res, data, "get user success");
  } catch (err) {
    res.status(401).send(err.message);
  }
};

const createUser = (req, res) => {
  res.send("create user");
};

const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    let checkUser = await model.users.findOne({
      where: {
        email: email,
      },
    });

    if (checkUser) {
      let checkPass = bcrypt.compareSync(password, checkUser.password);

      if (checkPass) {
        let token = createToken(checkUser);

        successCode(res, token, "login....");
      } else {
        res.status(500).send("password incorrect");
      }
    } else {
      res.status(500).send("email not found");
    }
    // successCode(res, data, 'Signup Success')
  } catch (err) {}
};

const signupUser = async (req, res) => {
  try {
    let { full_name, email, password } = req.body;
    let data = { full_name, email, password: bcrypt.hashSync(password, 10) };

    await model.users.create(data);

    // successCode(res, data, 'Signup Success')

    res.send("signup");
  } catch (err) {}
};

// PUT
const changeInfo = async(req, res) => {
  try {
    let { token } = req.headers;
    let decodeToken = descriptToken(token);
    let { user_id } = decodeToken.data;

    let { email, password, full_name, age, avatar } = req.body;
    let data = {
      email,
      password: bcrypt.hashSync(password, 10),
      full_name,
      age,
      avatar
    };
    await prisma.users.update({
      where: {
        user_id,
      },
      data,
    });

    res.send("changed info");
  } catch (error) {
    res.status(401).send("loi BE");
    
  }
}

//commonjs
module.exports = {
  getUser,
  getImagesCreate,
  getImagesSave,
  createUser,
  loginUser,
  signupUser,
  changeInfo
};
