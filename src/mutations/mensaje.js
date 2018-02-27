const { Wit, log } = require('node-wit');

function mensaje({ args, req }) {
    const {
        mensajeUser
    } = args;

    const client = new Wit({ accessToken: 'KYJIGXVI2IQN5RDF3WUGRRBF5XWDPFFO' });

    return client.message(mensajeUser, {})
    .then((data) => {
        return  data.entities.intent[0].value;
    })
    .catch(console.error);
}

module.exports = { mensaje };