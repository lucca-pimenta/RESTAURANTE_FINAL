import { Sequelize } from 'sequelize';

// --- AÇÃO NECESSÁRIA: INSIRA A SENHA REAL AQUI ---
const DB_NAME = 'restaurante'; // Mantenha, se este for o nome do seu banco
const DB_USER = 'root';        // Mantenha, se este for o seu usuário
const DB_PASS = 'ifsp'; 
const DB_HOST = 'localhost';   // Mantenha


const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: 'mysql', 
    logging: false 
});

// Exporta tanto o construtor Sequelize quanto a instância para uso nos modelos
export {
    Sequelize,
    sequelize
};
export default sequelize;
