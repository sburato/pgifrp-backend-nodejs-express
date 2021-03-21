const express = require('express');

const router = express.Router();

router.get('/parametro/:p', (request, response) => {
  response.send(`Você informou o parâmetro ${request.params.p}`);
});

router.get('/user/:id/nome/:name', (request, response) => {
  response.send(`Você acessou informações do usuário ${request.params.id} - 
    ${request.params.name}`);
});

module.exports = router;