//Importar models
const mongoose = require('mongoose');
const SolicitudPolitico = mongoose.model('solicitud_politico');
const SolicitudModificarPolitico = mongoose.model('solicitud_modificar_politico');
const SolicitudEliminarPolitico = mongoose.model('solicitud_eliminar_politico');
const Politico = mongoose.model('politico');
const Propuesta = mongoose.model('propuesta');
const Evento = mongoose.model('evento');
const SolicitudModificarPropuesta = mongoose.model('solicitud_modificar_propuesta');
const SolicitudModificarEvento = mongoose.model('solicitud_modificar_evento');
const SolicitudEliminarPropuesta = mongoose.model('solicitud_eliminar_propuesta');
const SolicitudEliminarEvento = mongoose.model('solicitud_eliminar_evento');
const Partido = mongoose.model('partido');
const Estado = mongoose.model('estado');
const Estudio = mongoose.model('estudio');
const Usuario = mongoose.model('usuario');
const Preferencia = mongoose.model('preferencia');
const Votacion = mongoose.model('votacion');
const VotacionNacional = mongoose.model('like_nacional');
const pubsub = require('./../../pubsub').pubsub;

const axios = require('axios');
const fs = require('file-system');
const deploy = require('./../../deploy');
const FormData = require('form-data');

//Funcion
function add_politico({ args, req }) {

    const {
        nombre, cargo, lugar_estudio, grado_academico, titulo, estado, partido, usuario, referencia
    } = args

    const estudios = new Estudio({
        titulo, grado_academico, lugar_estudio
    });
    //Area de registro
    var estudioId;
    estudios.save(function (err, estudio) {

        if (err) return console.error(err);
        estudioId = estudio.id

    });

    const politico = new SolicitudPolitico({
        nombre, cargo, partido, estado, usuario, referencia
    });

    //Guardar
    var arregloEstudios;
    politico.save(function (err, poli) {
        if (err) return console.error(err);
        arregloEstudios = poli.estudios;
        arregloEstudios.push(estudioId);
        poli.set({ estudios: arregloEstudios });
        
        poli.save(function (err, subscription_response) {
            pubsub.publish(require('./../subscriptions/constantes').POLITICO_ADD,  subscription_response );
        });
    }); 

    return politico;
}

function update_politico({ args, req }) {
    let {
        nombre, cargo, lugar_estudio, grado_academico, titulo, estado, estudios, partido, usuario, referencia, id_politico
    } = args
    //Estudios es undefined
    var estudiosAModificar;

    Estudio.findById(estudios, function (err, est) {
        var estudioId;
        if (est.grado_academico !== grado_academico || est.lugar_estudio !== lugar_estudio || est.titulo !== titulo) {
            var e = new Estudio({
                titulo, grado_academico, lugar_estudio
            });

            //Area de registro
            e.save(function (err, estudio) {
                if (err) return console.error(err);
                estudiosAModificar = estudio._id
            });
        } else {
            estudiosAModificar = estudios;
        }
        var politico = new SolicitudModificarPolitico({
            nombre, cargo, partido, estado, usuario, referencia, id_politico
        });

        //Guardar
        var arregloEstudios;
        politico.save(function (err, poli) {
            if (err) return console.error(err);
            arregloEstudios = [];
            arregloEstudios.push(estudiosAModificar);
            poli.set({ estudios: arregloEstudios });
            poli.save(function (err, subscription_response) {
                pubsub.publish(require('./../subscriptions/constantes').POLITICO_UPDATE,  subscription_response );
            });
        });
    });

    //Area del resolver
    return SolicitudModificarPolitico.findById(id_politico);
}

//Funcion
function delete_politico({ args, req }) {
    const {
        id_politico, id_usuario
    } = args;
    let politico = new SolicitudEliminarPolitico({
        id_politico, id_usuario
    });
    politico.save(function (err, subscription_response) {
        pubsub.publish(require('./../subscriptions/constantes').POLITICO_DELETE,  subscription_response );
    });

    //Area del resolver
    return SolicitudEliminarPolitico.findOne({ id_politico });
}

function patch_add_politico({ args, req }) {
    const { id_politico } = args;
    SolicitudPolitico.findById(id_politico, function (err, subscription_response) {
        pubsub.publish(require('./../subscriptions/constantes').PATCH_POLITICO_ADD_MODERADOR,  subscription_response );
    });
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
                        estado.save();
                    });
                if (estado == "5a68b566f5985aaea61a93ce") {
                    Estado.find({}).then(estados => {
                        estados.map(estadoPuntero => {
                            let votacionNacional = new VotacionNacional({
                                politico: politicoAprovado._id, estado: estadoPuntero._id, usuarios: []
                            });
                            votacionNacional.save();
                        })
                    })

                } else {
                    Votacion.findOne({ estado })
                        .then(votacion => {
                            if (votacion != null) {
                                preferenciaGenerada = new Preferencia({
                                    politico: politicoAprovado._id, usuarios: []
                                });
                                preferenciaGenerada.save();
                                preferencias = votacion.preferencias;
                                preferencias.push(preferenciaGenerada._id);
                                votacion.set({ preferencias });
                                votacion.save();
                            }else{
                                let votacionNueva = new Votacion({
                                    estado, preferencias: []
                                });
                                votacionNueva.save();
                                preferenciaGenerada = new Preferencia({
                                    politico: politicoAprovado._id, usuarios: []
                                });
                                preferenciaGenerada.save();
                                preferencias = votacionNueva.preferencias;
                                preferencias.push(preferenciaGenerada._id);
                                votacionNueva.set({ preferencias });
                                votacionNueva.save();
                            }
                        })
                }
            } else if (cargo === "Funcionario") {
                Estado.findById(estado)
                    .then(estado => {
                        cargos = estado.funcionarios;
                        cargos.push(politicoAprovado._id);
                        estado.set({ funcionarios: cargos });
                        estado.save();
                    });
            }

            var integrantes = [];
            Partido.findById(partido).then(p => {
                integrantes = p.integrantes;
                integrantes.push(politico._id);
                p.set({ integrantes: integrantes });
                p.save();
            });

            politicoAprovado.save(function (err, resp) {
                if (err) return console.error(err);
                SolicitudPolitico.findByIdAndRemove(_id, (err) => {
                    if (err) return console.error(err);
                });
                axios.post( deploy.demos_krb_http +'/changeFile', {
                    oldFileName:  _id,
                    newFileName: politicoAprovado._id
                })
                .catch(error => {
                    console.log(error.response)
                });
                return Politico.findById(resp._id);
            });
        });

}

function patchd_add_politico({ args, req }) {
    const { id_politico } = args;

    SolicitudPolitico.findById(id_politico, function (err, subscription_response) {
        pubsub.publish(require('./../subscriptions/constantes').PATCHD_POLITICO_ADD,  subscription_response );
    });

    SolicitudPolitico.findByIdAndRemove(id_politico, (err) => {
        if (err) return console.error(err);
    });

}

function patch_update_politico({ args, req }) {
    const {
        id_solicitud
    } = args;
    SolicitudModificarPolitico.findById(id_solicitud, function (err, subscription_response) {
        pubsub.publish(require('./../subscriptions/constantes').PATCH_POLITICO_UPDATE_MODERADOR,  subscription_response );
    });
    return SolicitudModificarPolitico.findById(id_solicitud)
        .then((politico) => {
            let { nombre, cargo, estado, partido, estudios, id_politico, _id } = politico;
            return Politico.findById(id_politico)
                .then((poli) => {
                    poli.nombre = nombre;
                    poli.cargo = cargo;
                    poli.partido = partido;
                    poli.estado = estado;
                    poli.estudios = estudios;

                    poli.save(function (err, resp) {
                        if (err) return console.error(err);
                        SolicitudModificarPolitico.findByIdAndRemove(_id, (err) => {
                            if (err) return console.error(err);
                        });
                        return Politico.findById(resp._id);
                    });

                })

        });
}

function patchd_update_politico({ args, req }) {
    const { id_solicitud } = args;
    SolicitudModificarPolitico.findById(id_solicitud, function (err, subscription_response) {
        pubsub.publish(require('./../subscriptions/constantes').PATCHD_POLITICO_UPDATE,  subscription_response );
    });
    return SolicitudModificarPolitico.findByIdAndRemove(id_solicitud, (err) => {
        if (err) return console.error(err);
    });

}

function patch_delete_politico({ args, req }) {
    const { id_solicitud } = args;
    SolicitudEliminarPolitico.findById(id_solicitud, function (err, subscription_response) {
        pubsub.publish(require('./../subscriptions/constantes').PATCH_POLITICO_DELETE_MODERADOR,  subscription_response );
    });
    SolicitudEliminarPolitico.findById(id_solicitud)
        .then((politico) => {
            var { nombre, cargo, estado, partido, estudios, id_politico, _id } = politico;
            
            //Eliminar registros con el político seleccionado
            VotacionNacional.deleteMany({ politico: id_politico }, function(err){
                console.log(err);
            });
            Preferencia.deleteMany({ politico: id_politico }, function(err){
                console.log(err);
            });
            Propuesta.deleteMany({ politico: id_politico }, function(err){
                console.log(err);
            });
            Evento.deleteMany({ politico: id_politico }, function(err){
                console.log(err);
            });

            //Solicitudes pendientes relacionadas al político
            SolicitudModificarEvento.deleteMany({ politico: id_politico }, function(err){
                console.log(err);
            });
            SolicitudModificarPropuesta.deleteMany({ politico: id_politico }, function(err){
                console.log(err);
            });
            SolicitudModificarPolitico.deleteMany({ politico: id_politico }, function(err){
                console.log(err);
            });
            SolicitudEliminarPolitico.deleteMany({ politico: id_politico }, function(err){
                console.log(err);
            });
            SolicitudEliminarEvento.deleteMany({ politico: id_politico }, function(err){
                console.log(err);
            });
            SolicitudEliminarPropuesta.deleteMany({ politico: id_politico }, function(err){
                console.log(err);
            });
            Politico.findByIdAndRemove(id_politico, (err, resp) => {
                if (err) return console.error(err);
                SolicitudEliminarPolitico.findByIdAndRemove(_id, (err) => {
                    if (err) return console.error(err);
                });
                return Politico.findById(resp._id);
            });

        });
}

function patchd_delete_politico({ args, req }) {
    const { id_solicitud } = args;
    SolicitudEliminarPolitico.findById(id_solicitud, function (err, subscription_response) {
        pubsub.publish(require('./../subscriptions/constantes').PATCHD_POLITICO_DELETE,  subscription_response );
    });
    SolicitudEliminarPolitico.findByIdAndRemove(id_solicitud, (err) => {
        if (err) return console.error(err);
    });
}

//Se exporta la funcion
module.exports = {
    add_politico,
    update_politico,
    delete_politico,
    patchd_add_politico,
    patch_add_politico,
    patch_update_politico,
    patchd_update_politico,
    patch_delete_politico,
    patchd_delete_politico
};
