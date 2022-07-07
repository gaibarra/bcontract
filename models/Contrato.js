const mongoose = require('mongoose');

const ContratoSchema = mongoose.Schema({
    tipo: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Tipo'
    } ,
    
    parte1: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Parte'
    },
    parte2: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Parte'
    },
    vendedor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario'
    },
    importe: {
        type: Number,
        required: true,
    },
    estado: {
        type: String,
        default: "EN TRAMITE"
    },
    creado: {
        type: Date,
        default: Date.now()
    }
    

});

module.exports = mongoose.model('Contrato', ContratoSchema);