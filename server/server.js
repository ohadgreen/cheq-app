const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const { Sequelize } = require('sequelize');

const app = express();
app.use('/', router);
app.use(bodyParser.urlencoded({
    extended: false,
}));
app.use(bodyParser.json());

require('./routes/vasts')(app);

async function testConnection() {
    const sequelize = new Sequelize('cheq', 'root', 'covid19', {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306,
        insecureAuth : true
    });
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));

testConnection();

router.get('/api/test', (req, res) => {
    res.send({ msg: 'cheq backend' });
})

module.exports = app;
