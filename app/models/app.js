// load env variables from the .env file
const builder = require('botbuilder')
const restify = require('restify')
const cognitiveServices = require('botbuilder-cognitiveservices')

//=========================================================
// Bot Setup
//=========================================================

const port = process.env.port || process.env.PORT || 3980
const server = restify.createServer()
server.listen(port, () => {
    console.log(`${server.name} listening to ${server.url}`)
})

const connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
})

var bot = new builder.UniversalBot(connector, [
    function (session) {
        builder.Prompts.text(session, 'Olá, sou um bot?');
        return session.send();
    }
]);

server.post('/api/messages', connector.listen())