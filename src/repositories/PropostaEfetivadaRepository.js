// src/infrastructure/repositories/PropostaEfetivadaRepository.js
const db = require('../data/database');

class PropostaEfetivadaRepository {
  save(propostaEfetivada, callback) {
    const { idDoAnalista, valorPremio, data, loja } = propostaEfetivada;

    const query = `
      INSERT INTO propostas_efetivadas (idDoAnalista, valorPremio, data, loja)
      VALUES (?, ?, ?, ?)
    `;

    db.run(query, [idDoAnalista, valorPremio, data, loja], function(err) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, { id: this.lastID });
      }
    });
  }

 findWithFilters({ startDate, endDate }, callback) {
    console.log(startDate, endDate);

    // Consulta para obter as efetivações e prêmios
    let queryEfetivacoes = `
        SELECT 
            COUNT(p.id) AS total_efetivacoes,
            SUM(p.valorPremio) AS total_premios
        FROM 
            propostas_efetivadas p
        WHERE 
            p.data >= '${startDate}' AND p.data <= '${endDate}';
    `;

    let listagemQueryEfetivacoes = `
        SELECT 
            a.nome AS nome_consultor,
            COUNT(p.id) AS quantidade_efetivacoes,
            SUM(p.valorPremio) AS soma_total_premios,
            AVG(p.valorPremio) AS media_premio
        FROM 
            propostas_efetivadas p
        JOIN 
            analistas a ON p.idDoAnalista = a.id
        WHERE 
            p.data >= '${startDate}' AND p.data <= '${endDate}'
        GROUP BY 
            a.nome;
    `;

    // Consulta para obter o valor da meta
    let queryMeta = `
        SELECT valor AS meta
        FROM meta;
    `;

    // Executa a primeira consulta
    db.all(queryEfetivacoes, (errEfetivacoes, rowsEfetivacoes) => {
        if (errEfetivacoes) {
            callback(errEfetivacoes, null);
            return;
        }

        // Executa a segunda consulta (listagem de efetivações)
        db.all(listagemQueryEfetivacoes, (errListagem, rowsListagem) => {
            if (errListagem) {
                callback(errListagem, null);
                return;
            }

            // Executa a terceira consulta (meta)
            db.all(queryMeta, (errMeta, rowsMeta) => {
                if (errMeta) {
                    callback(errMeta, null);
                    return;
                }

                // Monta o resultado final
                let resultado = {
                    total_efetivacoes: rowsEfetivacoes[0].total_efetivacoes,
                    total_premios: rowsEfetivacoes[0].total_premios,
                    meta: rowsMeta.length > 0 ? rowsMeta[0].meta : null,
                    efetivacoes: rowsListagem
                };

                callback(null, resultado);
            });
        });
    });
}


}

module.exports = new PropostaEfetivadaRepository();
