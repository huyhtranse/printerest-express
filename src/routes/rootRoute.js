const express = require('express');
const rootRouter = express.Router();

const userRouter = require('./userRoute');
const imageRouter = require('./imageRoute');

rootRouter.use("/user", userRouter);
rootRouter.use("/image", imageRouter);

module.exports = rootRouter;