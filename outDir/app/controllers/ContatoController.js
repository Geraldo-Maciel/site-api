"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Contato = require('../models/Contato'); var _Contato2 = _interopRequireDefault(_Contato);
var _Rodape = require('../models/Rodape'); var _Rodape2 = _interopRequireDefault(_Rodape);
var _Seo = require('../models/Seo'); var _Seo2 = _interopRequireDefault(_Seo);

class ContatoController {

    async show(req, res) {
        _Contato2.default.findOne({}).then((contato) => {
            _Rodape2.default.findOne({}).then((rodape) => {
                _Seo2.default.findOne({seoPg: "contato"}).then((seo) => {
                    return res.json({
                        error: false,
                        contato: contato,
                        rodape: rodape,
                        seo: seo
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

exports. default = new ContatoController();