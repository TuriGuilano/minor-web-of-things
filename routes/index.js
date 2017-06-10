const express = require('express')
const router = express.Router()
const request = require('request')

const deviceID = 'D999';
const URL = 'https://oege.ie.hva.nl/~palr001/icu/api.php?t=sdc&d=D999&td=8EA1&c=ff0000';

router.get('/', (req, res) => {
	res.render('index')
});

module.exports = router
