"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Sobre = require('../models/Sobre'); var _Sobre2 = _interopRequireDefault(_Sobre);
var _Rodape = require('../models/Rodape'); var _Rodape2 = _interopRequireDefault(_Rodape);
var _Seo = require('../models/Seo'); var _Seo2 = _interopRequireDefault(_Seo);
var _config = require('../../config/config'); var _config2 = _interopRequireDefault(_config);

class SobreController {

    async index(req, res) {
        const url = _config2.default.url + "/files/sobre/";
        _Sobre2.default.find({}).then((sobre) => {
            _Rodape2.default.findOne({}).then((rodape) => {
                _Seo2.default.findOne({ seoPg: "sobre" }).then((seo) => {
                    return res.json({
                        error: false,
                        sobre: sobre,
                        rodape: rodape,
                        seo: seo,
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
};

exports. default = new SobreController();