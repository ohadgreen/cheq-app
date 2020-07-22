const vastService = require('../services/vast.service');
const BASE_URL = '/vast';

module.exports = (app) => {
    app.get(`${BASE_URL}/all`, async (req, res) => {
        vasts = await vastService.showAll();
        // vastService.testService();

        if (!vasts)  {
            res.send({error: 'no vasts found'});
        }
        else {
            res.send(vasts);
        }
    });

    app.get(BASE_URL, async (req, res) => {
        const vastId = req.query.id;
        console.log('vastId: ' + req.query.id);
        let vast = await vastService.getVastXml(vastId);
        
        if (!vast)  {
            res.send({error: 'no vasts found'});
        }
        else {
            res.send(vast);
        }
        });

    app.post(BASE_URL, async (req, res) => {
        const vast = {
            vast_url: req.body.vast_url,
            position: req.body.position,
            width: req.body.width,
            height: req.body.height
        };

        const newVastInDb = await vastService.create(vast);
        console.log(JSON.stringify(newVastInDb));
        res.send(newVastInDb);
    });
}