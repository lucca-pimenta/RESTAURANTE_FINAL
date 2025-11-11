import { Sequelize, sequelize } from './db.js'; // Import named exports

const FALE_CONOSCO = sequelize.define('faleConosco', {
    id:{
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
   Mensagem: {
      type: Sequelize.STRING,
      allowNull: false
   }
})
sequelize.sync({ force: false })
   .then(() => {  
      console.log('Tabela faleconosco criada com sucesso!');
   })
   .catch((error) => {
      console.error('Erro ao criar tabela faleconosco:', error);
   });
// Export the Produtos model
export default FALE_CONOSCO;
