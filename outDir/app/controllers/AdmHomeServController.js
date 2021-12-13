"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _Home = require('../models/Home'); var _Home2 = _interopRequireDefault(_Home);

class AdmHomeServController {

    async show(req, res) {
        _Home2.default.findOne({}, "_id servTitulo servSubtitulo servUmIcone servUmTitulo servUmDesc servDoisIcone servDoisTitulo servDoisDesc servTresIcone servTresTitulo servTresDesc").then((home) => {
            return res.json({
                error: false,
                home: home
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

        const schema = Yup.object().shape({
            servTitulo: Yup.string()
                .required(),
            servSubtitulo: Yup.string()
                .required(),
            servUmIcone: Yup.string()
                .required(),
            servUmTitulo: Yup.string()
                .required(),
            servUmDesc: Yup.string()
                .required(),
            servDoisIcone: Yup.string()
                .required(),
            servDoisTitulo: Yup.string()
                .required(),
            servDoisDesc: Yup.string()
                .required(),
            servTresIcone: Yup.string()
                .required(),
            servTresTitulo: Yup.string()
                .required(),
            servTresDesc: Yup.string()
                .required()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                code: 108,
                message: "Erro: Dados do formulário inválido!"
            });
        };

        const { _id } = req.body;

        const homeExiste = await _Home2.default.findOne({ _id: _id });

        if (!homeExiste) {
            return res.status(400).json({
                error: true,
                code: 109,
                message: "Erro: Conteúdo da página home não encontrado!"
            });
        };

        await _Home2.default.updateOne({ _id: _id }, req.body, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 111,
                message: "Erro: Conteúdo da página home não editada com sucesso!"
            });

            return res.json({
                error: false,
                message: "Conteúdo da página home editado com sucesso!"
            });
        });
    };
};

exports. default = new AdmHomeServController();