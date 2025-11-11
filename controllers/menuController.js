import CARDAPIO from '../models/MenuModel.js';

const MenuController = {

    // ===============================
    // 🧾 LISTAR PRODUTOS
    // ===============================
    async showCardapio(req, res) {
        const isAdmin = req.session && req.session.isAdmin === true;

        try {
            const produtos = await CARDAPIO.findAll({
                raw: true,
                order: [['nome', 'ASC']]
            });

            console.log(`[MenuController] Renderizando cardápio. Usuário é Admin: ${isAdmin}`);

            res.render('cardapio', {
                layout: 'main',      // 🔹 Garante que o CSS carregue
                produtos,
                isAdmin
            });

        } catch (error) {
            console.error("🚨 Erro fatal ao listar cardápio (Causa Real):", error);
            res.status(500).send('Erro ao ler produtos do cardápio. Verifique o console do servidor para mais detalhes.');
        }
    },

    // ===============================
    // ➕ EXIBIR FORMULÁRIO DE ADIÇÃO
    // ===============================
    showAddForm(req, res) {
        res.render('add_produto', {
            layout: 'main',         // 🔹 Força o uso do layout principal
            action: '/admin/cardapio/add'
        });
    },

    // ===============================
    // ➕ ADICIONAR NOVO PRODUTO
    // ===============================
    async addProduto(req, res) {
        const { nome, preco } = req.body;
        try {
            await CARDAPIO.create({
                nome: nome.trim(),
                preco: parseFloat(preco)
            });
            res.redirect('/cardapio');
        } catch (error) {
            console.error("Erro ao adicionar produto:", error);
            let errorMessage = error.message;
            if (error.name === 'SequelizeUniqueConstraintError') {
                errorMessage = 'Este nome de produto já existe.';
            }
            res.status(500).send('Erro ao adicionar produto: ' + errorMessage);
        }
    },

    // ===============================
    // ✏️ EXIBIR FORMULÁRIO DE EDIÇÃO
    // ===============================
    async showEditForm(req, res) {
        const produtoId = req.params.id;
        try {
            const produto = await CARDAPIO.findByPk(produtoId, { raw: true });
            if (!produto) {
                return res.status(404).send('Produto não encontrado.');
            }
            res.render('edit_produto', {
                layout: 'main',       // 🔹 Força o layout principal (CSS volta a funcionar)
                produto,
                action: `/admin/cardapio/edit/${produtoId}`
            });
        } catch (error) {
            console.error("Erro ao buscar produto para edição:", error);
            res.status(500).send('Erro ao buscar produto: ' + error.message);
        }
    },

    // ===============================
    // ✏️ SALVAR EDIÇÃO
    // ===============================
    async editProduto(req, res) {
        const produtoId = req.params.id;
        const { nome, preco } = req.body;
        try {
            await CARDAPIO.update(
                { nome: nome.trim(), preco: parseFloat(preco) },
                { where: { id: produtoId } }
            );
            res.redirect('/cardapio');
        } catch (error) {
            console.error("Erro ao editar produto:", error);
            res.status(500).send('Erro ao atualizar produto: ' + error.message);
        }
    },

    // ===============================
    // 🗑️ EXCLUIR PRODUTO
    // ===============================
    async deleteProduto(req, res) {
        const produtoId = req.params.id;
        try {
            await CARDAPIO.destroy({ where: { id: produtoId } });
            res.redirect('/cardapio');
        } catch (error) {
            console.error("Erro ao excluir produto:", error);
            res.status(500).send('Erro ao excluir produto: ' + error.message);
        }
    }
};

export default MenuController;


