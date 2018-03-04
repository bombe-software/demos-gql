const { Wit, log } = require('node-wit');

function mensaje({ args, req }) {
    const {
        mensajeUser
    } = args;

    const client = new Wit({ accessToken: 'KYJIGXVI2IQN5RDF3WUGRRBF5XWDPFFO' });

    return client.message(mensajeUser, {})
    .then((data) => {
        console.log(data);
        if(JSON.stringify(data.entities) != '{}'){
            return  data.entities.datos[0].value;
        }
        return "No logro entenderte";
    })
    .catch(console.error);
}

module.exports = { mensaje };