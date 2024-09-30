const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PropostaController = require('./src/controllers/propostaController');
const AnalistaController = require('./src/controllers/analistaController');
const propostasEfetivadasRoutes = require('./src/controllers/propostasEfetivadasController');

const app = express();
const port = 3000;

// Configurar o middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rotas
app.post('/api/propostas', PropostaController.createProposta.bind(PropostaController));
app.get('/api/propostas', PropostaController.getPropostas.bind(PropostaController));
app.get('/api/propostas/:id', PropostaController.getPropostaById.bind(PropostaController));
app.put('/api/propostas/:id', PropostaController.updateProposta.bind(PropostaController));
app.delete('/api/propostas/:id', PropostaController.deleteProposta.bind(PropostaController));

app.post('/api/analistas', AnalistaController.createAnalista.bind(AnalistaController));
app.post('/api/login', AnalistaController.login.bind(AnalistaController));
app.use(propostasEfetivadasRoutes);
// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
