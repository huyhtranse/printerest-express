const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return storage.init(sequelize, DataTypes);
}

class storage extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    image_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'images',
        key: 'image_id'
      }
    },
    date_save: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'storage',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
          { name: "image_id" },
        ]
      },
      {
        name: "image_id",
        using: "BTREE",
        fields: [
          { name: "image_id" },
        ]
      },
    ]
  });
  }
}
