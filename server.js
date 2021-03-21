const express = require('express');
const parametros = require('./parametros.js');
const server_mimetypes = require('./server_mimetypes.js');

const app  = express();
const port = 3000;

app.get('/', (request, response) => {
  response.writeHead(302, {'Location': 'index.html'});
  response.end();
});

app.use(server_mimetypes);

app.get('/sobre', (request, response) => {
  response.send("<h1>Sobre<h1>");
});

app.get('/json', (request, response) => {
  response.status(200).json( { mensagem:  "HelloWorld" } );
});

app.get('/ab[0-9]cd', (request, response) => {
  response.send("<h1>Expressão Regular<h1>");  
});

app.use(parametros);

app.post('/usuario', (request, response) => {
  response.status(201).json( { mensagem:  "Usuário criado com sucesso." } );
});

app.get('*', (request, response) => {
  response.send("Rota não encontrada: 404");
});

app.listen(port, () => console.log(`Servidor escutando na porta ${port}`));