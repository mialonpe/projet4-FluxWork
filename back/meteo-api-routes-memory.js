//var express = require('express');
import express from 'express' ;
import meteoApi from './meteo-api.js';

const apiRouter = express.Router();

apiRouter.route('/meteo')
.get(async function(req, res, next) {
    var meteo = await meteoApi.getMeteo();
    console.log("apiRouter.route('/meteo') : " + JSON.stringify(meteo));
    res.send(meteo);
});

export default {apiRouter};