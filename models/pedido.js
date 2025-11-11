import { Sequelize, sequelize } from './db.js'; 

const PEDIDOS = sequelize.define('pedidos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Detalhes: {
        type: Sequelize.STRING,
        allowNull: true 
    },
    Endereco: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

sequelize.sync({ force: false })
    .then(() => {
        console.log('Tabela pedidos criada com sucesso!');
    })
    .catch((error) => {
        console.error('Erro ao criar tabela pedidos:', error);
    });


export default PEDIDOS;