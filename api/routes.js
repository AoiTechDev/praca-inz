var express = require("express");
var router = express.Router();

const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));

    
router.get('/', async function (req, res) {

    })

module.exports=router;