const { Wit, log } = require('node-wit');

function mensaje({ args, req }) {
    const {
        mensajeUser
    } = args;

    const client = new Wit({ accessToken: 'KYJIGXVI2IQN5RDF3WUGRRBF5XWDPFFO' });

    return client.message(mensajeUser, {})
    .then((data) => {
        if(JSON.stringify(data.entities) != '{}'){
            const bombe = data.entities['bombe'];
            const humor = data.entities['humor'];
            const datos = data.entities['datos'];
            const politicos = data.entities['politicos'];
            const conversacion = data.entities['conversacion'];
            const registro = data.entities['registro'];
            const incompatibles = data.entities['incompatibles'];
            const tendenciasPoliticas = data.entities['tendenciasPoliticas'];
            if(bombe){
                return  data.entities.bombe[0].value;
            }else if(humor){
                return  data.entities.humor[0].value;
            }else if(datos){
                return  data.entities.datos[0].value;
            }else if(politicos){
                return  data.entities.politicos[0].value;
            }else if(conversacion){
                return  data.entities.conversacion[0].value;
            }else if(registro){
                return  data.entities.registro[0].value;
            }else if(incompatibles){
                return  data.entities.incompatibles[0].value;
            }else if(tendenciasPoliticas){
                return  data.entities.tendenciasPoliticas[0].value;
            }
        }
        return "No logro entenderte";
    })
    .catch(console.error);
}

module.exports = { mensaje };