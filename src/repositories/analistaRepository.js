const db = require('../data/database');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class AnalistaRepository {
  createAnalista(analista, callback) {
    const { nome, usuario, senha } = analista;
    bcrypt.hash(senha, saltRounds, (err, hashedPassword) => {
      if (err) {
        callback(err);
        return;
      }

      const stmt = db.prepare(`
        INSERT INTO analistas (nome, usuario, senha)
        VALUES (?, ?, ?)
      `);

      stmt.run(nome, usuario, hashedPassword, callback);
      stmt.finalize();
    });
  }

  getAnalistaByUsuario(usuario, callback) {
    db.get('SELECT * FROM analistas WHERE usuario = ?', [usuario], callback);
  }
}

module.exports = new AnalistaRepository();
