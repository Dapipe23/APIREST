const { Schema, model } = require('mongoose');

const PaisSchema = Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    }
});

PaisSchema.methods.toJSON = function () {
    const { __v, _id, ...pais } = this.toObject();
    pais.uid = _id;
    return pais;
}

module.exports = model.Pais || model('Pais', PaisSchema);
