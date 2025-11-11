import express from 'express';
import ReservaController from '../controllers/ReservaController.js';
import FaleController from '../controllers/FaleController.js';
import CardapioController from '../controllers/menuController.js';
import CadastroController from '../controllers/CadastroController.js';
import LoginController from '../controllers/LoginController.js';
import PedidoController from '../controllers/PedidoController.js';
import UsuariosController from '../controllers/Usuarios_controller.js';

const router = express.Router();

// Middleware: verificar se é cliente
function checkClient(req, res, next) {
  if (!req.session || !req.session.userName) return res.redirect('/Login/new');
  if (req.session.isAdmin === true)
    return res.render('Aviso', {
      titulo: 'Acesso Negado',
      mensagem: `Não é possível acessar esta página, pois você é administrador.`
    });
  next();
}

// Middleware: verificar se é admin
function requireAdmin(req, res, next) {
  if (!req.session || !req.session.userName) return res.redirect('/Login/new');
  if (req.session.isAdmin !== true)
    return res.render('Aviso', {
      titulo: 'Acesso Restrito',
      mensagem: `Você não tem permissão de administrador.`
    });
  next();
}

// Página inicial
router.get('/', (req, res) => res.render('Base'));

// Fale conosco
router.post('/fale/add', FaleController.addNewFale);

// Reservas (cliente)
router.get('/reserva/new', checkClient, ReservaController.showFormReserva);
router.post('/reserva/add', checkClient, ReservaController.addNewReserva);

// Usuários (admin)
router.get('/admin/usuarios', requireAdmin, UsuariosController.listarUsuarios);
router.post('/admin/usuarios/apagar/:id', requireAdmin, UsuariosController.apagarUsuario);

// Pedido (cliente)
router.get('/Pedido/new', checkClient, PedidoController.showFormPedido);
router.post('/Pedido/add', checkClient, PedidoController.addNewPedido);

// Login
router.get('/Login/new', LoginController.showFormLogin);
router.post('/Login/add', LoginController.authenticateLogin);

// Cadastro
router.get('/Cadastro/new', CadastroController.showFormCadastro);
router.post('/Cadastro/add', CadastroController.addNewCadastro);

// Cardápio
router.get('/cardapio', CardapioController.showCardapio);

// Admin: cardápio CRUD
router.get('/admin/cardapio/add', requireAdmin, CardapioController.showAddForm);
router.post('/admin/cardapio/add', requireAdmin, CardapioController.addProduto);
router.get('/admin/cardapio/edit/:id', requireAdmin, CardapioController.showEditForm);
router.post('/admin/cardapio/edit/:id', requireAdmin, CardapioController.editProduto);
router.post('/admin/cardapio/delete/:id', requireAdmin, CardapioController.deleteProduto);

export default router;
