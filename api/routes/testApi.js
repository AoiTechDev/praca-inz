

var express = require("express");
var router = express.Router();


const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));



router.get("/", async function(req,res,next){
    const url = 'https://eu.api.blizzard.com/profile/user/wow?namespace=profile-eu&locale=en_US&access_token=EU6pX9G0xWdG1V0K8s81Ns8qa7lx5jIqMX'
    fetch(url)
    .then(res => res.json())
    .catch(err => console.error('error'+err));

    try{
        let response = await fetch(url);
        response = await response.json();
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({msg: 'internal server error'});
    }
});

router.get("/test", async function(req,res,next){
    const url = 'https://eu.api.blizzard.com/profile/wow/character/ragnaros/samantro/reputations?namespace=profile-eu&locale=en_US&access_token=EU6pX9G0xWdG1V0K8s81Ns8qa7lx5jIqMX'
    fetch(url)
    .then(res => res.json())
    .catch(err => console.error('error'+err));

    try{
        let response = await fetch(url);
        response = await response.json();
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({msg: 'internal server error'});
    }
});

module.exports=router;