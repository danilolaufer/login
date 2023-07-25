const mongoose = require("mongoose");
const CONFIG = require("../config/constans")


module.exports={
    connection: null,
    connect: ()=>{
        return mongoose.connect(CONFIG.DB, { useUnifiedTopology: true, useNewUrlParser: true }).then(connection=>{
        this.connection = connection;
        console.log("Conexion a db exitoso");
    }).catch(err => console.log(err));
    }
}



