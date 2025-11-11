import { Sequelize, sequelize } from './db.js'; 

const RESERVA = sequelize.define('Reservas', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false
  },
  data: {
    type: Sequelize.DATEONLY, 
    allowNull: false
  },
  horario: {
    type: Sequelize.TIME, 
    allowNull: false
  },
  pessoas: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

sequelize.sync({ force: false })
  .then(() => {  
    console.log('Tabela Reservas criada com sucesso!');
  })
  .catch((error) => {
    console.error('Erro ao criar tabela Reservas:', error);
  });

export default RESERVA;