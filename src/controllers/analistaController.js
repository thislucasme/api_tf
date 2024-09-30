const AnalistaUseCase = require('../usecases/analistaUseCase');

class AnalistaController {
  async createAnalista(req, res) {
    try {
      const analista = req.body;
      const result = await AnalistaUseCase.createAnalista(analista);
      res.status(201).json({ id: result.lastID });
    } catch (err) {
      console.error('Erro ao criar analista', err);
      res.status(500).json({ error: 'Erro ao criar analista' });
    }
  }

  async login(req, res) {
    try {
      const { usuario, senha } = req.body;
      const result = await AnalistaUseCase.login(usuario, senha);
      if (result) {
        res.status(200).json({ message: 'Login bem-sucedido', id: result.id });
      } else {
        res.status(401).json({ error: 'Credenciais inválidas' });
      }
    } catch (err) {
      console.error('Erro ao fazer login', err);
      res.status(500).json({ error: 'Erro ao fazer login' });
    }
  }
}

module.exports = new AnalistaController();
