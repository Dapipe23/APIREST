const { Schema, model } = require('mongoose');

const FutbolistaSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    posicion: {
        type: String,
        required: true
    },
    nacionalidad: {
        type: Schema.Types.ObjectId,
        ref: 'Pais',
        required: true
    }
});

FutbolistaSchema.methods.toJSON = function () {
    const { __v, _id, ...futbolista } = this.toObject();
    futbolista.uid = _id;
    return futbolista;
}

module.exports = model.Futbolista || model('Futbolista', FutbolistaSchema);
