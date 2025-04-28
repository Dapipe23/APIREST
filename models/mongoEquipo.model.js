const { Schema, model } = require('mongoose');

const EquipoSchema = Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    pais: {
        type: Schema.Types.ObjectId,
        ref: 'Pais',
        required: true
    }
});

EquipoSchema.methods.toJSON = function () {
    const { __v, _id, ...equipo } = this.toObject();
    equipo.uid = _id;
    return equipo;
}

module.exports = model.Equipo || model('Equipo', EquipoSchema);
