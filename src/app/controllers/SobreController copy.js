import Sobre from '../models/Sobre';
import Rodape from '../models/Rodape';

class SobreController{

    async index(req, res){
        const url = "http://localhost:8080/files/sobre/";
        Sobre.find({}).then((sobre) => {
            Rodape.findOne({}).then((rodape)=> {
                return res.json({
                    error: false,
                    sobre: sobre,
                    rodape: rodape,
                    url
                });
            }).catch((err) => {
                return res.status(400).json({
                    error: true,
                    code: 106,
                    message: "Erro: Não foi possível executar a solicitação!"
                });
            });
            
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 101,
                message: "Erro: Não foi possível executar a solicitação!"
            });
        });
    };

    async store(req, res){

        /*const dados = {
            "titulo": "Oh yeah, it’s that good.",
            "descricao": "Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.",
            "originalName": "sobre.jpg",
            "fileName": "sobre.jpg"
        }*/

        await Sobre.create(req.body, (err) => {
            if(err) return res.status(400).json({
                error: true,
                code: 102,
                message: "Erro: Sobre empresa não cadastrado com sucesso!"
            });

            return res.json({
                error: false,
                message: "Sobre empresa cadastrado com sucesso!"
            });
        });
    };
};

export default new SobreController();