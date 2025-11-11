import RESERVA from '../models/Reserva.js'; 

const ReservaController = {
    showFormReserva: (req, res) => {
        res.render('formulario');
    },
    addNewReserva: async (req, res) => {
        const { nome, data, horario, pessoas } = req.body;
        try {
            await RESERVA.create({
                nome,
                data,
                horario,
                pessoas
            });
            res.redirect('/');
        } catch (error) {
            console.error("Erro ao adicionar reserva:", error);
            res.status(500).send('Erro ao adicionar reserva: ' + error.message);
        }
    }
}

export default ReservaController;
