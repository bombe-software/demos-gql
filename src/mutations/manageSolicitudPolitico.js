//Importar models
const mongoose = require('mongoose');
const SolicitudPolitico = mongoose.model('solicitud_politico');
const Politico = mongoose.model('politico');
const Usuario = mongoose.model('usuario');
const Estado = mongoose.model('estado');
const Partido = mongoose.model('partido');

function aceptarSolicitudPolitico({args, req}) {
    const { id_politico } = args;
     if (!id_politico) {
        throw new Error('Error al hacer fetch con el Politico');
    }
    SolicitudPolitico.findById(id_politico)
    .then((politico) => {
        const { nombre, cargo, estado, partido, estudios,referencia , _id } = politico;
        console.log("Partido: " + partido);
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
            SolicitudPolitico.findByIdAndRemove(_id, (err)=>{
                if (err) return console.error(err);
            });
            console.log(resp._id);
            return Politico.findById(resp._id);
        });
    });

}

function denegarSolicitudPolitico({args, req}) {
    const { id_politico /*id_usuario*/ } = args;

    SolicitudPolitico.findByIdAndRemove(id_politico, (err)=> {
        if(err) return console.error(err);
    });

}

module.exports = { 
    aceptarSolicitudPolitico, 
    denegarSolicitudPolitico 
};