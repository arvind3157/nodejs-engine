const search_service = require('../services/search');

const search = (req, res) => {
    if(req.body === undefined || req.body.key === undefined) {
        res.json({'Error': 'Invalid request format'})
    }
    let result = search_service.search(req.body.key,req.body.k||5);
    res.json({ result });
}

module.exports = {
    search
}