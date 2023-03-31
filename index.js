'use strict'

let mongoose = require('mongoose');
let app = require('./app')
let port = 3700;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/portafolio').then(() => {
    console.log("conexion ok")

    app.listen(port, ()=>{
        console.log('funciona')
    })

}).catch(err => console.log(err))