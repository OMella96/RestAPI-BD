'use strict'

let express = require('express');
let bodyParser = require('body-parser')
let app = express();

//archivos rutas
let project_routes = require ('./routes/project')

//middlewares
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

//Cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//rutas
app.use('/', project_routes)

//export
module.exports = app;