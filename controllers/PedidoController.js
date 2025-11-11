import PEDIDOS from '../models/pedido.js'; 

const PedidoController = { 
    showFormPedido: (req, res) => {
        res.render('Pedido'); 
    },
    addNewPedido: async (req, res) => {
        const { nome, Detalhes, Endereço } = req.body; 
        try {
            await PEDIDOS.create({
                nome: nome,
                Detalhes: Detalhes, 
                Endereco: Endereço   
            });
            res.redirect('/');  
        } catch (error) {
            console.error("Erro ao adicionar Pedido", error);
            res.status(500).send('Erro ao adicionar pedido: ' + error.message);
        }
    }
}
export default PedidoController; 