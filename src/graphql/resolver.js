
const { PrismaClient } = require("@prisma/client");
const { descriptToken } = require("../config/jwt");

const prisma = new PrismaClient();

const resolverGrap = {
  getUser: async (args) => {
    let { token } = args;
    let decodeToken = descriptToken(token);
    let { user_id } = decodeToken.data;

    let data = await prisma.users.findFirst({
      where: {
        user_id: user_id,
      },
    });
    return data;
  },

  getImages: async() => {
    let data = await prisma.images.findMany();

    return data;
  },

  createUser: () => {
    return 123;
  },
};

module.exports = resolverGrap;