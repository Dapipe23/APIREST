const { Schema, model } = require('mongoose');

const ContratacionSchema = Schema({
    idjugador: {
        type: Schema.Types.ObjectId,
        ref: 'Futbolista',
        required: true
    },
    idequipo: {
        type: Schema.Types.ObjectId,
        ref: 'Equipo',
        required: true
    },
    desde: {
        type: Date,
        required: true
    },
    hasta: {
        type: Date,
        required: true
    }
});

ContratacionSchema.methods.toJSON = function () {
    const { __v, _id, ...contratacion } = this.toObject();
    contratacion.uid = _id;
    return contratacion;
}

module.exports = model.Contratacion || model('Contratacion', ContratacionSchema);
