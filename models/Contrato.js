const mongoose = require('mongoose');

const ContratoSchema = mongoose.Schema({
    tipo: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Tipo'
    } ,
    
    parte: {
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
    }
    

}),

module.exports = mongoose.model('Contrato', ContratoSchema);