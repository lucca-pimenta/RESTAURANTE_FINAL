import { Sequelize } from 'sequelize';
import { sequelize } from './db.js';

const CADASTRO = sequelize.define('Cadastro', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Senha: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Cargo: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

export default CADASTRO;
