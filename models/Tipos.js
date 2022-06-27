const mongoose = require('mongoose');

const TiposSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
       
    },
    encalidadde1: {
        type: String,
        required: true,
        trim: true
    },
    encalidadde1f: {
        type: String,
        required: true,
        trim: true
    }, 
    encalidadde2: {
        type: String,
        required: true,
        trim: true
    },
    encalidadde2f: {
        type: String,
        required: true,
        trim: true
    }, 
    encalidadde3: {
        type: String,
        trim: true
    },
    encalidadde3f: {
        type: String,
        trim: true
    }, 


});

TiposSchema.index({ nombre: 'text' });

module.exports = mongoose.model('Tipo', TiposSchema);