//var express = require('express');
import express from 'express' ;
import transportApi from './transport-api.js';


const apiRouter = express.Router();

apiRouter.route('/transport')
.get(async function(req, res, next) {
    console.log("apiRouter.route('/transport')");
    var transport = await transportApi.getChantiers();
    res.send(transport);
});

export default {apiRouter};