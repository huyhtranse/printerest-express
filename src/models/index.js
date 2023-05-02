// đối tượng dùng để kết nối CSDL

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('printerest', 'root', '1234', {
    host: "localhost",
    dialect: "mysql",
    port: 3306
})

module.exports = sequelize;


try {
    sequelize.authenticate();
    console.log("------------------")
    console.log("Database Connected")
    console.log("------------------")
} catch (err) {
    console.log("Fail", err)
}

