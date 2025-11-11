import CADASTRO from '../models/Cadastro.js'; 
import bcrypt from 'bcrypt'; // 🔑 PASSO 1: Importar o bcrypt

const CadastroController = {
    showFormCadastro: (req, res) => {
        res.render('Cadastro');
    },

    addNewCadastro: async (req, res) => {
        const { nome, Senha, Cargo } = req.body; 

        try {
     
            const saltRounds = 10; 
            const hashedPassword = await bcrypt.hash(Senha, saltRounds);
            
          
            const cargoFormatado = Cargo ? Cargo.trim() : 'Cliente';
            
   
            await CADASTRO.create({
                nome,
                Senha: hashedPassword,
                Cargo: cargoFormatado
            });

            console.log(`Novo cadastro criado: ${nome} | Cargo: ${cargoFormatado} (Senha hasheada)`);
            res.redirect('/');
        } catch (error) {
            console.error("❌ Erro ao adicionar Cadastro:", error);
            res.status(500).send("Erro ao adicionar Cadastro: " + error.message);
        }
    }
}

export default CadastroController;