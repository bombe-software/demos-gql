//Importar models
const mongoose = require('mongoose');
const Bug = mongoose.model('bug');
//Funcion
function deleteBug({ args, req }) {
    const { id_bug } = args;
    if (!id_bug) {
        throw new Error('Error al hacer fetch con el Usuario');
    }
    Bug.remove({ _id: 'large' }, (err) => {
        if (err) return JSON.stringify(err);
    });
    return "Todo bien"
}
module.exports = {
    deleteBug
};