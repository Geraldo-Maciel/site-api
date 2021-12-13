"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Home = require('../models/Home'); var _Home2 = _interopRequireDefault(_Home);
var _Rodape = require('../models/Rodape'); var _Rodape2 = _interopRequireDefault(_Rodape);
var _Seo = require('../models/Seo'); var _Seo2 = _interopRequireDefault(_Seo);
var _config = require('../../config/config'); var _config2 = _interopRequireDefault(_config);

class HomeController {

    async show(req, res) {
        const url = _config2.default.url + "/files/home/";
        _Home2.default.findOne({}).then((home) => {
            _Rodape2.default.findOne({}).then((rodape) => {
                _Seo2.default.findOne({seoPg: "index"}).then((seo) => {
                    return res.json({
                        error: false,
                        home: home,
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

exports. default = new HomeController();