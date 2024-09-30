const PropostaUseCase = require('../usecases/propostaUseCase');

class PropostaController {
  async createProposta(req, res) {
    try {
      const proposta = req.body;
      proposta.creationDate = new Date().toISOString().split('T')[0];
      const result = await PropostaUseCase.createProposta(proposta);
      res.status(201).json({ id: result.lastID });
    } catch (err) {
      console.error('Erro ao inserir proposta', err);
      res.status(500).json({ error: 'Erro ao inserir proposta' });
    }
  }

  async getPropostas(req, res) {
    try {
      const { startDate, endDate } = req.query;
      if (!startDate || !endDate) {
        return res.status(400).json({ error: 'Parâmetros startDate e endDate são obrigatórios' });
      }
      const result = await PropostaUseCase.getPropostasByDateRange(startDate, endDate);
      res.json(result);
    } catch (err) {
      console.error('Erro ao obter propostas por intervalo de datas', err);
      res.status(500).json({ error: 'Erro ao obter propostas' });
    }
  }

  async getPropostaById(req, res) {
    try {
      const id = req.params.id;
      const result = await PropostaUseCase.getPropostaById(id);
      if (result) {
        res.json(result);
      } else {
        res.status(404).json({ error: 'Proposta não encontrada' });
      }
    } catch (err) {
      console.error('Erro ao obter proposta', err);
      res.status(500).json({ error: 'Erro ao obter proposta' });
    }
  }

  async updateProposta(req, res) {
    try {
      const id = req.params.id;
      const proposta = req.body;
      const result = await PropostaUseCase.updateProposta(id, proposta);
      if (result.changes > 0) {
        res.status(200).json({ changes: result.changes });
      } else {
        res.status(404).json({ error: 'Proposta não encontrada' });
      }
    } catch (err) {
      console.error('Erro ao atualizar proposta', err);
      res.status(500).json({ error: 'Erro ao atualizar proposta' });
    }
  }

  async deleteProposta(req, res) {
    try {
      const id = req.params.id;
      const result = await PropostaUseCase.deleteProposta(id);
      if (result.changes > 0) {
        res.status(200).json({ changes: result.changes });
      } else {
        res.status(404).json({ error: 'Proposta não encontrada' });
      }
    } catch (err) {
      console.error('Erro ao deletar proposta', err);
      res.status(500).json({ error: 'Erro ao deletar proposta' });
    }
  }
}

module.exports = new PropostaController();
