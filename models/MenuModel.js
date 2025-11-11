import { Sequelize, sequelize } from './db.js';

// 1. Array com os dados iniciais do cardápio
export const DADOS_INICIAIS_CARDAPIO = [
    { nome: "Pizza de Calabresa", preco: 30.00 },
    { nome: "Pizza de Frango", preco: 28.00 },
    { nome: "Hamburguer Artesanal", preco: 25.00 },
    { nome: "Refrigerante Lata", preco: 6.00 },
    { nome: "Suco Natural", preco: 8.00 }
];

const CARDAPIO = sequelize.define('cardapio', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    preco: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'cardapios'
});

export default CARDAPIO;
