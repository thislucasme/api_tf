// src/presentation/routes/propostasEfetivadasRoutes.js
const express = require('express');
const createPropostaEfetivada = require('../usecases/createPropostaEfetivada');
const getPropostaEfetivada = require('../usecases/getPropostaEfetivada');

const router = express.Router();

router.post('/api/propostas_efetivadas', (req, res) => {
  const { idDoAnalista, valorPremio, data, loja } = req.body;

  createPropostaEfetivada({ idDoAnalista, valorPremio, dataProposta: data, loja }, (err, result) => {
    if (err) {
      console.error('Erro ao salvar proposta_efetivada:', err);
      res.status(500).json({ error: 'Erro ao salvar proposta efetivada' });
    } else {
      res.status(201).json(result);
    }
  });
});

router.post('/api/propostas_efetivadas/get', (req, res) => {
  const { startDate, endDate } = req.body;

  getPropostaEfetivada({ startDate, endDate }, (err, result) => {
    if (err) {
      console.error('Erro ao buscar proposta_efetivada:', err);
      res.status(500).json({ error: 'Erro ao buscar proposta efetivada' });
    } else {
      res.status(201).json(result);
    }
  });
});

module.exports = router;
