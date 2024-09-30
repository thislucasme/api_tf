const AnalistaRepository = require('../repositories/analistaRepository');
const bcrypt = require('bcrypt');

class AnalistaUseCase {
  createAnalista(analista) {
    return new Promise((resolve, reject) => {
      AnalistaRepository.createAnalista(analista, function (err) {
        if (err) reject(err);
        else resolve(this);
      });
    });
  }

  login(usuario, senha) {
    return new Promise((resolve, reject) => {
      AnalistaRepository.getAnalistaByUsuario(usuario, (err, row) => {
        if (err) {
          reject(err);
        } else if (row) {
          bcrypt.compare(senha, row.senha, (err, result) => {
            if (err) {
              reject(err);
            } else if (result) {
              resolve({ id: row.id });
            } else {
              resolve(null);
            }
          });
        } else {
          resolve(null);
        }
      });
    });
  }
}

module.exports = new AnalistaUseCase();
