const { Wit, log } = require('node-wit');
const _ = require('lodash');

function mensaje({ args, req }) {
    const {
        mensajeUser
    } = args;

    const client = new Wit({ accessToken: 'KYJIGXVI2IQN5RDF3WUGRRBF5XWDPFFO' });

    return client.message(mensajeUser, {})
        .then((data) => {
            if (JSON.stringify(data.entities) != '{}') {
                let array_mensajes = _.values(data.entities)[0];
                return _.sample(array_mensajes).value;
            }
            return "No logro entenderte";
        })
        .catch(console.error);
}

module.exports = { mensaje };