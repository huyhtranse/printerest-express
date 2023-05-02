const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return images.init(sequelize, DataTypes);
}

class images extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    image_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    path: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    descr: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    }
  }, {
    sequelize,
    tableName: 'images',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "image_id" },
        ]
      },
      {
        name: "user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
