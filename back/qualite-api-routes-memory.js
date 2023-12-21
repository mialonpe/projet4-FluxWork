//var express = require('express');
import express from 'express' ;
import qualiteApi from './qualite-api.js'
const apiRouter = express.Router();

apiRouter.route('/qualite-air')
.get(async function(req, res, next) {
    var qualite = await qualiteApi.getQualite();
    res.send(qualite);
});

export default {apiRouter};