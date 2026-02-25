const mongoose = require('mongoose');
const {Schema} = require("mongoose");


const recetaSchema = new Schema({
    nombre: {type: String, required: true, trim: true},
    descripcion: {type: String, required: true, trim: true},
    ingredientes: {type: String, required: true, trim: true},
    instrucciones: {type: String, required: true, trim: true},
    categorias: [{type: String, required: true, trim: true}],
        valoracion:{
            puntuacion: {type: Number, required: true},
            votos: {type: Number, required: true},
        }
    },
    {versionKey: false}
    );

module.exports = mongoose.model('Receta', recetaSchema, 'recetas');