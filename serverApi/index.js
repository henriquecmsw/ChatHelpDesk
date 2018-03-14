var restify = require('restify');
const path = require('path');
// Request File System Module
var fs = require('fs');
var jsonObj;

function respond(req, res, next) {
    var st = getValuesChamado(req.params.protocolo);
    res.send('Status = ' + req.params.protocolo + "[" + st + "]" );
  //res.send(getValuesChamado('01010101'));
  next();
}

var server = restify.createServer();
server.get('/:protocolo', respond);
server.head('/:protocolo', respond);

//var chamado = [numero_chamado, status, servico, identificador_servico, descricao_problema]

//read file chamados
//path: data/chamados.json


function getJsonChamado( protocolo ){
    // Create a relative path URL
    let reqPath = path.join(__dirname, 'data/chamados/'+protocolo+'.json');
    //Read JSON from relative path of this file
    fs.readFile(reqPath , 'utf8', function (err, data) {
        //Handle Error
    if(!err) {
        //Handle Success
        //console.log("Success"+data);
        // Parse Data to JSON OR
        jsonObj = JSON.parse(data);

        numeroChamado = jsonObj["numero_chamado"]; 
        status = jsonObj["status"];
        servico = jsonObj["servico"];
        identificadorServico = jsonObj["identificador_servico"];
        descricaoProblema = jsonObj["descricao_problema"];

        console.log(numeroChamado);
        console.log(status);
        console.log(identificadorServico);
        console.log(descricaoProblema);

        }else {
            //Handle Error
            res.end("Error: "+err )
        }

        return status;
    });
}

function getValuesChamado(protocolo){
    getJsonChamado(protocolo);
}



//save chamados

//get chamados

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});




