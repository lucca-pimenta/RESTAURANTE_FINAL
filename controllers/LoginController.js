import CADASTRO from '../models/Cadastro.js'; 
import bcrypt from 'bcrypt'; 

const LoginController = {
    /**
     * Exibe o formulário de login.
     */
    showFormLogin: (req, res) => {
        // Renderiza a view 'Login.handlebars'
        res.render('Login'); 
    },

    /**
     * Autentica o usuário e define as variáveis de sessão.
     * Define req.session.isAdmin baseado no campo Cargo.
     */
    authenticateLogin: async (req, res) => {
        const { nome, Senha } = req.body; 

        if (!req.session) {
            console.error("🚨 ERRO CRÍTICO: req.session está indefinido! Verifique o express-session no app.js");
            return res.status(500).send("Falha no servidor: sessão não inicializada.");
        }

        try {
            // Busca o usuário pelo nome (login)
            const user = await CADASTRO.findOne({ where: { nome } });

            if (!user) {
                console.warn(`⚠️ Tentativa de login com usuário inexistente: ${nome}`);
                return res.render('Login', { erro: 'Usuário ou senha inválidos.' });
            }

            // --- INÍCIO DA SEÇÃO DE DEBUG ---
            console.log('\n====================================');
            console.log(`[DEBUG - Login] Tentativa de login para: ${nome}`);
            console.log('Senha digitada (req.body.Senha):', Senha);
            console.log('Senha do Banco de Dados (user.Senha):', user.Senha); 
            console.log('--- FIM DA SEÇÃO DE DEBUG ---');
            
            // Compara a senha digitada com o hash armazenado
            const isMatch = await bcrypt.compare(Senha, user.Senha);

            console.log('Resultado do bcrypt.compare (isMatch):', isMatch);
            console.log('====================================\n');
            
            if (isMatch) {
                
                // Determina se o usuário é administrador
                // Remove espaços e converte para minúsculas para garantir a checagem correta
                const cargo = user.Cargo ? user.Cargo.trim().toLowerCase() : '';
                const isAdmin = cargo === 'admin';

                // Define as variáveis de sessão que serão usadas pelos middlewares
                req.session.isAdmin = isAdmin;
                req.session.userName = user.nome;

                console.log(`✅ Login bem-sucedido: ${user.nome} | Cargo: "${user.Cargo}" | isAdmin: ${isAdmin}`);

                // Redireciona para a página inicial
                return res.redirect('/'); 

            } else {
                console.warn(`❌ Senha incorreta para o usuário: ${nome}`);
                return res.render('Login', { erro: 'Usuário ou senha inválidos.' });
            }

        } catch (error) {
            console.error("💥 Erro durante autenticação:", error);
            res.status(500).send("Erro no servidor: " + error.message);
        }
    }
};

export default LoginController;
