// Definimos librerias slack
var Slack = require('slack-node');

// Alojamos webHook
webhookUri = "https://hooks.slack.com/services/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";

// Instanciomos api Slack
slack = new Slack();
slack.setWebhook(webhookUri);

// Agremamos e instaciomos express
const express = require('express')
const app = express()
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Definimos servicio de liveprobe
app.get('/slack', function (req, res) {
    console.log( req.query.canal);
    slack.webhook({
        channel: "#aplicaciones",
        username: req.param("usuario"),
        text: req.param("mensaje")
    }, function (err, response) {
        console.log(response);
    });
    res.send('El servicio slack funciona correctamente')
})

// Generamos metodo para alertas por slack
app.post('/alertas', function (req, res) {
    slack.webhook({
        channel: req.body.canal,
        username: req.body.usuario,
        text: req.body.mensaje
    }, function (err, response) {
        console.log(response);
    });
    res.send('Mensaje: ' + req.body.mensaje + ' enviado a  : ' + JSON.stringify(req.body.canal) + 'Usuario:' + req.body.usuario);
});

app.listen(3000)