const Vast = require('../sequelize');
const utils = require('../utils/fileUtils');

const showAll = async() => {
    try {
        return await Vast.findAll();
    }
    catch(ex) {
        throw new Error(ex.message);
    }
}

const showOne = async(vastId) => {
    try {
        return await Vast.findOne({
            where: { id: vastId }
        });
        
    } catch (error) {
        console.log(JSON.stringify(error));
        throw new Error(error.message); 
    }
}

const getVastXml = async(vastId) => {
    const vastInDb = await showOne(vastId);

    if (vastInDb) {
        const vastXmlTemplate = utils.readFile('vast_template.xml');
    
        const vastXml = vastXmlTemplate.replace('[HEIGHT]', vastInDb.height)
            .replace('[WIDTH]', vastInDb.width)
            .replace('[POSITION]', vastInDb.position)
            .replace('[VAST_URL]', vastInDb.vast_url)
            .replace('[VAST_ID]', vastInDb.id);
    
        return vastXml;
    }
    else {
        return '<VAST version="2.0"></VAST>';
    }
}

const create = async(vast) => {
    try {
        let newVast = await Vast.create(vast);
        return newVast;
    } catch (error) {
        console.log(JSON.stringify(error));
        throw new Error(error.message); 
    }
}

const testService = function() {
    console.log("test service :)");
}

module.exports = { showAll, getVastXml, create, testService }