const express = require('express');
const router = express.Router();
require('./models/mongo')

router.post('/agency', require('./controllers').createAgency);

router.put('/client', require('./controllers').updateClient);

router.get('/agency/with_top_client/:agency_id', require('./controllers').getAgencyWithTopClient);

module.exports = router;
