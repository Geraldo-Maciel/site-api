"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _fs = require('fs'); var _fs2 = _interopRequireDefault(_fs);

class PerfilImagemController{
    async update(req, res){

        /*await sleep(3000);

        function sleep(ms) {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
            });
        }*/

        if(!req.file){
            return res.status(400).json({
                error: true,
                code: 129,
                message: "Error: Selecione uma imagem válida JPEG ou PNG!"
            });
        };

        const dadosImagem = {
            originalName: req.file.originalname,
            fileName: req.file.filename
        }

        await _User2.default.findOne({ _id: req.userId}, '_id fileName').then((user) => {
            req.dadosImgUser = user.fileName;
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 128,
                message: "Erro: Não foi possível executar a solicitação!"
            })
        })

        await _User2.default.updateOne({_id: req.userId}, dadosImagem, (err) => {
            if(err) return res.status(400).json({
                error: true,
                code: 129,
                message: "Erro: Imagem do perfil não editado com sucesso!"
            });
        });

        const imgAntiga = req.file.destination + "/" + req.dadosImgUser;

        _fs2.default.access(imgAntiga, (err) => {
            if(!err){
                _fs2.default.unlink(imgAntiga, err => {
                    //Msg de imagem excluida sucesso
                })
            }
        })

        return res.json({
            error: false,
            message: "Imagem do perfil editado com sucesso!"
        });
    }
};

exports. default = new PerfilImagemController();