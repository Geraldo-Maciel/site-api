"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Rodape = require('../models/Rodape'); var _Rodape2 = _interopRequireDefault(_Rodape);

class RodapeController{

    async show(req, res){
        _Rodape2.default.findOne({}).then((rodape) => {
            return res.json({
                error: false,
                rodape: rodape
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
        
        const rodapeExiste = await _Rodape2.default.findOne({});
        if(rodapeExiste){
            return res.status(400).json({
                error: true,
                code: 103,
                message: "Erro: O radapé já possui um registro!"
            })
        }

        const dados = {
            tituloPg: "Celke",
            tituloCont: "Contato",
	        telCont:"(XX) XXXXX-XXXX",
            endCont: "Av. Winston Churchill",
            cnpjCont: "CNPJ: XX.XXX.XXX/XXXX-XX",
            tituloRedSoc: "Redes Sociais",
            instTitulo: "Instagram",
            instLink: "https://www.instagram.com/celkecursos",
            facTitulo: "Facebook",
            facLink: "https://www.facebook.com/celkecursos/",
            youtubeTitulo: "Youtube",
            youtubeLink: "https://www.youtube.com/channel/UC5ClMRHFl8o_MAaO4w7ZYug",
            twiterTitulo: "Twiter",
            twiterLink: "https://twitter.com/celkecursos"
        }

        await _Rodape2.default.create(dados, (err) => {
            if(err) return res.status(400).json({
                error: true,
                code: 102,
                message: "Erro: Dados do rodapé não cadastrado com sucesso!"
            });

            return res.json({
                error: false,
                message: "Dados do rodapé cadastrado com sucesso!"
            });
        });
    };
};

exports. default = new RodapeController();