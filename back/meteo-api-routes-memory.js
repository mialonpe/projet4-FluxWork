//var express = require('express');
import express from 'express' ;
import meteoApi from './meteo-api.js';

const apiRouter = express.Router();

apiRouter.route('/meteo')
.get(async function(req, res, next) {
    var meteo = await meteoApi.getMeteo();
    res.send(meteo);
});

export default {apiRouter};