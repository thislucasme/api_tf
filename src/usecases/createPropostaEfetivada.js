// src/application/use_cases/createPropostaEfetivada.js
const PropostaEfetivadaRepository = require('../repositories/PropostaEfetivadaRepository');
const PropostaEfetivada = require('../entities/PropostaEfetivada');

function createPropostaEfetivada(data, callback) {
  const { idDoAnalista, valorPremio, dataProposta, loja } = data;

  const novaProposta = new PropostaEfetivada(idDoAnalista, valorPremio, dataProposta, loja);

  PropostaEfetivadaRepository.save(novaProposta, callback);
}

module.exports = createPropostaEfetivada;
