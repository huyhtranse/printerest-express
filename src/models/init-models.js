const DataTypes = require("sequelize").DataTypes;
const _comments = require("./comments");
const _images = require("./images");
const _storage = require("./storage");
const _users = require("./users");

function initModels(sequelize) {
  const comments = _comments(sequelize, DataTypes);
  const images = _images(sequelize, DataTypes);
  const storage = _storage(sequelize, DataTypes);
  const users = _users(sequelize, DataTypes);

  images.belongsToMany(users, { as: 'user_id_users', through: storage, foreignKey: "image_id", otherKey: "user_id" });
  users.belongsToMany(images, { as: 'image_id_images', through: storage, foreignKey: "user_id", otherKey: "image_id" });
  comments.belongsTo(images, { as: "image", foreignKey: "image_id"});
  images.hasMany(comments, { as: "comments", foreignKey: "image_id"});
  storage.belongsTo(images, { as: "image", foreignKey: "image_id"});
  images.hasMany(storage, { as: "storages", foreignKey: "image_id"});
  comments.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(comments, { as: "comments", foreignKey: "user_id"});
  images.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(images, { as: "images", foreignKey: "user_id"});
  storage.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(storage, { as: "storages", foreignKey: "user_id"});

  return {
    comments,
    images,
    storage,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
