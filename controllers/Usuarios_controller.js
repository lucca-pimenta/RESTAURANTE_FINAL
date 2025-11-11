import CADASTRO from '../models/Cadastro.js';

const UsuariosController = {
  // 🔹 Exibe a lista de usuários
  listarUsuarios: async (req, res) => {
    try {
      const usuarios = await CADASTRO.findAll({ raw: true }); // ESSENCIAL

      console.log('👥 Usuários encontrados:', usuarios);

      // ✅ CORREÇÃO: o "layout" deve ser só 'main' e não 'layouts/main'
      res.render('usuarios', {
        layout: 'main', // 🔧 corrigido aqui
        usuarios,
        isAdmin: req.session?.isAdmin || false
      });
    } catch (error) {
      console.error('❌ Erro ao listar usuários:', error);
      res.status(500).send('Erro ao listar usuários');
    }
  },

  // 🔹 Apaga um usuário (confirmação feita via JavaScript)
  apagarUsuario: async (req, res) => {
    try {
      const { id } = req.params;
      const usuario = await CADASTRO.findByPk(id);

      if (!usuario) {
        return res.status(404).send('Usuário não encontrado');
      }

      await usuario.destroy();
      console.log(`🗑️ Usuário ${id} removido com sucesso.`);
      res.redirect('/admin/usuarios');
    } catch (error) {
      console.error('❌ Erro ao apagar usuário:', error);
      res.status(500).send('Erro ao apagar usuário');
    }
  }
};

export default UsuariosController;
