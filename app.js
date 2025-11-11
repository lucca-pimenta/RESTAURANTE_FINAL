import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import appRoutes from './routes/routes.js';
import session from 'express-session';
import db from './models/db.js';
import CARDAPIO, { DADOS_INICIAIS_CARDAPIO } from './models/MenuModel.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// 🔹 Sessão
app.use(session({
    secret: 'SUPER_SECRETO',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 } // 1 hora
}));

// 🔹 Middlewares básicos
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// ⚙️ CONFIGURAÇÃO CORRETA DO HANDLEBARS
app.engine('handlebars', engine({
    defaultLayout: 'main', // ✅ não inclua "layouts/"
    layoutsDir: path.join(__dirname, 'views', 'layouts'), // ✅ caminho absoluto
    partialsDir: path.join(__dirname, 'views', 'partials') // ✅ se tiver partials
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views')); // ✅ define a pasta base

// 🔹 Middleware global
app.use((req, res, next) => {
    res.locals.isAdmin = req.session?.isAdmin === true;
    res.locals.userName = req.session?.userName;
    next();
});

// 🔹 Rotas
app.use('/', appRoutes);

// 🔹 Banco de dados
const startServer = async () => {
    try {
        await db.authenticate();
        console.log('✅ Conectado ao banco de dados com sucesso.');

        await db.sync(); // não altera a estrutura das tabelas
        console.log('✅ Modelos sincronizados.');

        const count = await CARDAPIO.count();
        if (count === 0) {
            await CARDAPIO.bulkCreate(DADOS_INICIAIS_CARDAPIO);
            console.log('✅ Dados iniciais inseridos no cardápio.');
        }

        const PORT = 7882;
        app.listen(PORT, () =>
            console.log(`🚀 Servidor rodando em http://localhost:${PORT}`)
        );

    } catch (error) {
        console.error('❌ Erro ao conectar ao banco:', error.message);
    }
};

startServer();
