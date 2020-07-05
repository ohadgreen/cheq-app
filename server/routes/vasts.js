const Vast = require('../sequelize');
const BASE_URL = '/vast';

module.exports = (app) => {
    app.get(`${BASE_URL}/all`, async (req, res) => {
        vasts = await Vast.findAll();
        console.log(JSON.stringify(vasts));
        
        if (!vasts)  {
            res.send({error: 'no vasts found'});
        }
        else {
            res.send(vasts);
        }
    });

    app.get(BASE_URL, async (req, res) => {
        console.log('vastId: ' + req.query.id);
        vast = await Vast.findOne({
            where: { id: req.query.id }
        });
        console.log(JSON.stringify(vast));
        
        if (!vast)  {
            res.send({error: 'no vasts found'});
        }
        else {
            res.send(vast);
        }
        });

    app.post(BASE_URL, async (req, res) => {
        const data = {
            vast_url: req.body.vast_url,
            position: req.body.position,
            width: req.body.width,
            height: req.body.height
        };

        console.log('new vast data: ' + JSON.stringify(data));
        const newVastInDb = await Vast.create(data);
        console.log(JSON.stringify(newVastInDb));
        res.send(newVastInDb);
    });
}