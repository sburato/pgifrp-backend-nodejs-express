const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const mimeTypes = {
  html: 'text/html',
  css : 'text/css',
  js  : 'text/javascript',
  png : 'image/png',
  jpeg: 'image/jpeg',
  jpg : 'image/jpg',
  woff: 'font/woof',
  map : 'text/plain', 
};

router.get('/index.html', (request, response) => {  
  executar(request, response);
});

router.get('/public/*', (request, response) => {  
  executar(request, response);
}); 

function executar(request, response) {
  let caminho_completo_recurso = path.join(process.cwd(), decodeURI(request.url));
  console.log(caminho_completo_recurso);
  
  let recurso_carregado;
  try {
    recurso_carregado = fs.lstatSync(caminho_completo_recurso);   
  } catch (error) {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.write('404: Arquivo não encontrado.');
    response.end();    
    return;
  }

  if (recurso_carregado.isFile()) {
    let extensao = path.extname(caminho_completo_recurso).substring(1);
    let mimeType = mimeTypes[extensao];    
    response.writeHead(200, {'Content-Type': mimeType});
    let fluxo_arquivo = fs.createReadStream(caminho_completo_recurso);
    fluxo_arquivo.pipe(response);
  } else if (recurso_carregado.isDirectory()) {
    response.writeHead(302, {'Location': 'index.html'});
    response.end();
  } else {
    response.writeHead(500, { 'Content-Type': 'text/plain' });
    response.write('500: Erro interno do servidor.');
    response.end();
  }
}; 

module.exports = router;