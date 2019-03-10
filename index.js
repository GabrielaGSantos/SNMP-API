let snmp = require('./snmp')

var express = require('express')
var app = express()

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });

var port = 8008

app.listen(port, function(err) {
    console.log("Ouvindo na porta: " + port)
})

app.use(express.static('public'))

app.get('/dados-formulario', urlencodedParser, async function (req, res){    

    resposta = await snmp.novaSessao(req.query.ip, req.query.comunidade, [req.query.oid], req.query.metodos)
    res.send(resposta)
});

