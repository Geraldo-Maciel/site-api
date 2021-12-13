"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Home = require('../models/Home'); var _Home2 = _interopRequireDefault(_Home);
var _fs = require('fs'); var _fs2 = _interopRequireDefault(_fs);
var _config = require('../../config/config'); var _config2 = _interopRequireDefault(_config);

class AdmHomeDetImgController {    

    async show(req, res) {
        const url = _config2.default.url + "/files/home/";
        _Home2.default.findOne({}, "_id detOriginalName detFileName").then((home) => {
            const {_id, detOriginalName, detFileName} = home;
            return res.json({
                error: false,
                home: {_id, detOriginalName, detFileName, url}
            });
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 106,
                message: "Erro: Não foi possível executar a solicitação!"
            });
        });
    };

    async update(req, res) {

        if (!req.file) {
            return res.status(400).json({
                error: true,
                code: 129,
                message: "Error: Selecione uma imagem válida JPEG ou PNG!"
            });
        };

        const dadosImagem = {
            detOriginalName: req.file.originalname,
            detFileName: req.file.filename
        }

        await _Home2.default.findOne({ _id: req.body._id }, '_id detFileName').then((home) => {
            req.dadosImgHome = home.detFileName;
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 128,
                message: "Erro: Não foi possível executar a solicitação!"
            })
        })

        await _Home2.default.updateOne({ _id: req.body._id }, dadosImagem, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 129,
                message: "Erro: Imagem não editada com sucesso!"
            });
        });
        
        const imgAntiga = req.file.destination + "/" + req.dadosImgHome;

        _fs2.default.access(imgAntiga, (err) => {
            if (!err) {
                _fs2.default.unlink(imgAntiga, err => {
                    //Msg de imagem excluida sucesso
                })
            }
        })

        return res.json({
            error: false,
            message: "Imagem editada com sucesso!"
        });
    }
};

exports. default = new AdmHomeDetImgController();