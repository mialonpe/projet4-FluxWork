//var express = require('express');
import express from 'express' ;
import disruptionApi from './disruption-api.js';

const apiRouter = express.Router();

apiRouter.route('/perturbations')
.get(async function(req, res, next) {
    var disrupt = await disruptionApi.getDisruption();
    res.send(disrupt);
});

export default {apiRouter};