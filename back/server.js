
import express from 'express' ;
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import meteoApiRoutes from './meteo-api-routes-memory.js';
import qualiteApiRoutes from './qualite-api-routes-memory.js';
import disruptionApiRoutes from './disruption-api-routes-memory.js';
//import transportApiRoutes from './transport-api-routes-memory.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

var app = express();

//support parsing of JSON post data
var jsonParser = express.json({  extended: true}); 
app.use(jsonParser);

//les routes en /front/... seront gérées par express
app.use(express.static(__dirname+"/../front"));

app.get('/', function(req , res ) {
   res.redirect('/index.html');
});

//delegate REST API routes to apiRouter(s) :
app.use(meteoApiRoutes.apiRouter); 
app.use(qualiteApiRoutes.apiRouter);
app.use(disruptionApiRoutes.apiRouter);
//app.use(transportApiRoutes.apiRouter);

app.listen(8282 , function () {
   console.log("http://localhost:8282");
});