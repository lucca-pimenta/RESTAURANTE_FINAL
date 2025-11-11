import FALE_CONOSCO from '../models/faleConosco.js'; 

const FaleController = {
    addNewFale: async (req, res) => {
        const { mensagem} = req.body
        try{
            await FALE_CONOSCO.create({
                Mensagem: mensagem
            });
        } catch (error) {
            console.error("Error adding FALE_CONOSCO", error);
            res.status(500).send('Error ao adicionar mensagem' + error.message);
        }
    }
}
    export default FaleController;