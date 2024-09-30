const db = require('../data/database');

class PropostaRepository {
  createProposta(proposta, callback) {
    const { name, email, phone1, phone2, operationCode, operationCodeComplement, productionGroup, paymentMethod, installments, contractType, insuranceType, analystId, creationDate } = proposta;
    const stmt = db.prepare(`
      INSERT INTO propostas (name, email, phone1, phone2, operationCode, operationCodeComplement, productionGroup, paymentMethod, installments, contractType, insuranceType, analystId, creationDate)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(name, email, phone1, phone2, operationCode, operationCodeComplement, productionGroup, paymentMethod, installments, contractType, insuranceType, analystId, creationDate, callback);
    stmt.finalize();
  }

  getPropostasByDateRange(startDate, endDate, callback) {
    db.all(
      `SELECT p.id, p.name, p.email, p.phone1, p.phone2, p.operationCode, p.operationCodeComplement, 
              p.productionGroup, p.paymentMethod, p.installments, p.contractType, p.insuranceType, 
              a.nome AS analystName, p.creationDate
       FROM propostas p
       JOIN analistas a ON p.analystId = a.id
       WHERE DATE(p.creationDate) >= DATE(?) AND DATE(p.creationDate) <= DATE(?)`,
      [startDate, endDate],
      callback
    );
  }

  getPropostaById(id, callback) {
    db.get('SELECT * FROM propostas WHERE id = ?', [id], callback);
  }

  updateProposta(id, proposta, callback) {
    const { name, email, phone1, phone2, operationCode, operationCodeComplement, productionGroup, paymentMethod, installments, contractType, insuranceType } = proposta;
    const stmt = db.prepare(`
      UPDATE propostas
      SET name = ?, email = ?, phone1 = ?, phone2 = ?, operationCode = ?, operationCodeComplement = ?, productionGroup = ?, paymentMethod = ?, installments = ?, contractType = ?, insuranceType = ?
      WHERE id = ?
    `);
    stmt.run(name, email, phone1, phone2, operationCode, operationCodeComplement, productionGroup, paymentMethod, installments, contractType, insuranceType, id, callback);
    stmt.finalize();
  }

  deleteProposta(id, callback) {
    db.run('DELETE FROM propostas WHERE id = ?', [id], callback);
  }
}

module.exports = new PropostaRepository();
