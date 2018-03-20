const { Wit, log } = require('node-wit');

function mensaje({ args, req }) {
    const {
        mensajeUser
    } = args;

    const client = new Wit({ accessToken: 'KYJIGXVI2IQN5RDF3WUGRRBF5XWDPFFO' });

    return client.message(mensajeUser, {})
        .then((data) => {
            if (JSON.stringify(data.entities) != '{}') {
                const  bombe  =  data.entities['bombe'];
                const  humor  =  data.entities['humor'];
                const  datos  =  data.entities['datos'];
                const  politicos  =  data.entities['politicos'];
                const  conversacion  =  data.entities['conversacion'];
                const  elecciones = data.entities['elecciones'];
                const  registro  =  data.entities['registro'];
                const  incompatibles  =  data.entities['incompatibles'];
                const  tendenciasPoliticas  =  data.entities['tendenciasPoliticas'];
                if (bombe) {
                    let  id  =  Math.floor(Math.random() * bombe.length);
                    return  data.entities.bombe[id].value;
                } else  if (humor) {
                    let  id  =  Math.floor(Math.random() * humor.length);
                    return  data.entities.humor[id].value;
                } else  if (datos) {
                    let  id  =  Math.floor(Math.random() * datos.length);
                    return  data.entities.datos[id].value;
                } else  if (politicos) {
                    let  id  =  Math.floor(Math.random() * politicos.length);
                    return  data.entities.politicos[id].value;
                } else  if (conversacion) {
                    let  id  =  Math.floor(Math.random() * conversacion.length);
                    return  data.entities.conversacion[id].value;
                } else  if (elecciones) {
                    let  id  =  Math.floor(Math.random() * elecciones.length);
                    return  data.entities.elecciones[id].value;
                } else  if (registro) {
                    let  id  =  Math.floor(Math.random() * registro.length);
                    return  data.entities.registro[id].value;
                } else  if (incompatibles) {
                    let  id  =  Math.floor(Math.random() * incompatibles.length);
                    return  data.entities.incompatibles[id].value;
                } else  if (tendenciasPoliticas) {
                    let  id  =  Math.floor(Math.random() * tendenciasPoliticas.length);
                    return  data.entities.tendenciasPoliticas[id].value;
                }
            }
            return "No logro entenderte";
        })
        .catch(console.error);
}

module.exports = { mensaje };