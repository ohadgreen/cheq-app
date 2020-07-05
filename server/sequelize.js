const Sequelize = require('sequelize');
const VastModel = require('./model/vast');


const sequelize = new Sequelize('cheq', 'root', 'covid19', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    define: {
        timestamps: false
    }
});

const Vast = VastModel(sequelize, Sequelize);

module.exports = Vast;