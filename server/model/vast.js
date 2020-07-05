module.exports = (sequelize, type) => {
    return sequelize.define('vast', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        vast_url: type.STRING,
        position: type.STRING,
        width: type.INTEGER,
        height: type.INTEGER
    })
}