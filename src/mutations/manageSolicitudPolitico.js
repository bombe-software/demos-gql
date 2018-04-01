//Importar models
const mongoose = require('mongoose');
const SolicitudPolitico = mongoose.model('solicitud_politico');
const Politico = mongoose.model('politico');
const Usuario = mongoose.model('usuario');
const Estado = mongoose.model('estado');
const Partido = mongoose.model('partido');
const Preferencia = mongoose.model('preferencia');
const Votacion = mongoose.model('votacion');
const VotacionNacional = mongoose.model('like_nacional');

function aceptarSolicitudPolitico({ args, req }) {
    const { id_politico } = args;
    if (!id_politico) {
        throw new Error('Error al hacer fetch con el Politico');
    }
    SolicitudPolitico.findById(id_politico)
        .then((politico) => {
            const { nombre, cargo, estado, partido, estudios, referencia, _id } = politico;

            politicoAprovado = new Politico({
                nombre, cargo, estado, partido, estudios, referencia
            });

            var cargos = [];
            if (cargo === "Candidato") {
                Estado.findById(estado)
                    .then(estado => {
                        cargos = estado.candidatos;
                        cargos.push(politicoAprovado._id);
                        estado.set({ candidatos: cargos });
                        estado.save(function (err) {
                            if (err) return console.error(err);
                        });
                    });
                if (estado == "5a68b566f5985aaea61a93ce") {
                    Estado.find({}).then(estados => {
                        estados.map(estadoPuntero => {
                            let votacionNacional = new VotacionNacional({
                                politico: politicoAprovado._id, estado: estadoPuntero._id, usuarios: []
                            });
                            votacionNacional.save((err, pref) => {
                                if (err) console.log(err);
                            });
                        })
                    })

                } else {
                    Votacion.findOne({ estado })
                        .then(votacion => {
                            if (votacion != null) {
                                preferenciaGenerada = new Preferencia({
                                    politico: politicoAprovado._id, usuarios: []
                                });
                                preferenciaGenerada.save(function (err) {
                                    if (err) return console.error(err);
                                });
                                preferencias = votacion.preferencias;
                                preferencias.push(preferenciaGenerada._id);
                                votacion.set({ preferencias });
                                votacion.save(function (err) {
                                    if (err) return console.error(err);
                                });
                            }else{
                                let votacionNueva = new Votacion({
                                    estado, preferencias: []
                                });
                                votacionNueva.save((err, pref) => {
                                    if (err) console.log(err);
                                });
                                preferenciaGenerada = new Preferencia({
                                    politico: politicoAprovado._id, usuarios: []
                                });
                                preferenciaGenerada.save(function (err) {
                                    if (err) return console.error(err);
                                });
                                preferencias = votacionNueva.preferencias;
                                preferencias.push(preferenciaGenerada._id);
                                votacionNueva.set({ preferencias });
                                votacionNueva.save(function (err) {
                                    if (err) return console.error(err);
                                });
                            }
                        })
                }
            } else if (cargo === "Funcionario") {
                Estado.findById(estado)
                    .then(estado => {
                        cargos = estado.funcionarios;
                        cargos.push(politicoAprovado._id);
                        estado.set({ funcionarios: cargos });
                        estado.save(function (err) {
                            if (err) return console.error(err);
                        });
                    });
            }

            var integrantes = [];
            Partido.findById(partido).then(p => {
                integrantes = p.integrantes;
                integrantes.push(politico._id);
                p.set({ integrantes: integrantes });
                p.save(function (err) {
                    if (err) return console.error(err);
                });
            });

            politicoAprovado.save(function (err, resp) {
                if (err) return console.error(err);
                SolicitudPolitico.findByIdAndRemove(_id, (err) => {
                    if (err) return console.error(err);
                });
                return Politico.findById(resp._id);
            });
        });

}

function denegarSolicitudPolitico({ args, req }) {
    const { id_politico /*id_usuario*/ } = args;

    SolicitudPolitico.findByIdAndRemove(id_politico, (err) => {
        if (err) return console.error(err);
    });

}

module.exports = {
    aceptarSolicitudPolitico,
    denegarSolicitudPolitico
};