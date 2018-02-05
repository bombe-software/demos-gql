//Importar models
const mongoose = require('mongoose');
const Solicitud_Politico = mongoose.model('solicitud_politico');
const Politico = mongoose.model('politico');
const Partido = mongoose.model('partido');
const Estado = mongoose.model('estado');

const Estudio = mongoose.model('estudio');
//Funcion
function addPolitico({ args, req }) {

    const {
        nombre, cargo, lugar_estudio, grado_academico, titulo, estado, partido, usuario, referencia
    } = args

    if (!usuario) {
        throw new Error('Falta id del Usuario');
    }
    if (!nombre) {
        throw new Error('Falta nombre');
    }
    if (/^\s+|\s+$/.test(nombre)) {
        throw new Error('Nombre inválido');
    }
    if (!partido) {
        throw new Error('Falta partido');
    }
    if (!estado) {
        throw new Error('Falta estado');
    }
    if (!cargo) {
        throw new Error('Falta cargo');
    }
    if (!grado_academico) {
        throw new Error('Falta grado academico');
    }
    if (!lugar_estudio) {
        throw new Error('Falta lugar de estudio');
    }
    if (!titulo) {
        throw new Error('Falta titulo de estudio');
    }
    if (!referencia) {
        throw new Error('Falta link de referencia');

    } else if (referencia != undefined) {
        var re = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/;
        if (/^\s+|\s+$/.test(referencia)) {
            throw new Error('Link invalido');
        } else
            if (!re.test(referencia)) {
                throw new Error('Link invalido');
            }
    }

    const estudios = new Estudio({
        titulo, grado_academico, lugar_estudio
    });
    //Area de registro
    var estudioId;
    estudios.save(function (err, estudio) {

        if (err) return console.error(err);
        estudioId = estudio.id

    });

    const politico = new Solicitud_Politico({
        nombre, cargo, partido, estado, usuario, referencia
    });

    //Guardar
    var arregloEstudios;
    politico.save(function (err, poli) {
        if (err) return console.error(err);
        arregloEstudios = poli.estudios;
        arregloEstudios.push(estudioId);
        poli.set({ estudios: arregloEstudios });
        poli.save(function (err) {
            if (err) return console.error(err);
        });

    });

    var cargos = [];
    if (cargo === "Candidato") {
        Estado.findById(estado)
            .then(estado => {
                cargos = estado.candidatos;
                cargos.push(politico._id);
                estado.set({ candidatos: cargos });
                estado.save(function (err) {
                    if (err) return console.error(err);
                });
            });
    } else if (cargo === "Funcionario") {
        Estado.findById(estado)
            .then(estado => {
                cargos = estado.funcionarios;
                cargos.push(politico._id);
                estado.set({ funcionarios: cargos });
                estado.save(function (err) {
                    if (err) return console.error(err);
                });
            });
    }
    console.log(args);
    var integrantes = [];
    Partido.findById(partido).then(partido => {
        integrantes = partido.integrantes;
        integrantes.push(politico._id);
        partido.set({ integrantes: integrantes });
        partido.save(function (err) {
            if (err) return console.error(err);
        });
    })

    //Area del resolver
    return Solicitud_Politico.findOne({ nombre });
}

//Se exporta la funcion
module.exports = { addPolitico };
