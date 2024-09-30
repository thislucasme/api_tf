const PropostaRepository = require('../repositories/propostaRepository');

class PropostaUseCase {
  createProposta(proposta) {
    return new Promise((resolve, reject) => {
      PropostaRepository.createProposta(proposta, function (err) {
        if (err) reject(err);
        else resolve(this);
      });
    });
  }

  getPropostasByDateRange(startDate, endDate) {
    return new Promise((resolve, reject) => {
      PropostaRepository.getPropostasByDateRange(startDate, endDate, function (err, rows) {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  getPropostaById(id) {
    return new Promise((resolve, reject) => {
      PropostaRepository.getPropostaById(id, function (err, row) {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  updateProposta(id, proposta) {
    return new Promise((resolve, reject) => {
      PropostaRepository.updateProposta(id, proposta, function (err) {
        if (err) reject(err);
        else resolve(this);
      });
    });
  }

  deleteProposta(id) {
    return new Promise((resolve, reject) => {
      PropostaRepository.deleteProposta(id, function (err) {
        if (err) reject(err);
        else resolve(this);
      });
    });
  }
}

module.exports = new PropostaUseCase();
