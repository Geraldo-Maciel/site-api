"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _Seo = require('../models/Seo'); var _Seo2 = _interopRequireDefault(_Seo);

class AdmSeoController {

    async index(req, res) {

        const { page = 1 } = req.query;
        const { limit = 40 } = req.query;
        await _Seo2.default.paginate({}, { select: '_id seoPg', page, limit, sort: '-createdAt' }).then((seo) => {
            return res.json({
                error: false,
                seo: seo
            });
        }).catch((erro) => {
            return res.status(400).json({
                error: true,
                code: 106,
                message: "Erro: Não foi possível executar a solicitação!"
            });
        });
    };

    async show(req, res) {
        _Seo2.default.findOne({ _id: req.params.id }).then((seo) => {
            return res.json({
                error: false,
                seo: seo
            });
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 107,
                message: "Erro: Não foi possível executar a solicitação!"
            })
        });
    };

    async store(req, res) {
        const schema = Yup.object().shape({
            seoPg: Yup.string()
                .required(),
            seoTitle: Yup.string()
                .required(),
            seoDesc: Yup.string()
                .required(),
            seoAutor: Yup.string()
                .required()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                code: 103,
                message: "Error: Dados inválidos!"
            });
        };

        await _Seo2.default.create(req.body, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 101,
                message: "Error: Seo não cadastrado com sucesso!"
            });

            return res.status(200).json({
                error: false,
                message: "Seo cadastrado com sucesso!"
            })
        });


    };

    async update(req, res) {

        const schema = Yup.object().shape({
            seoPg: Yup.string()
                .required(),
            seoTitle: Yup.string()
                .required(),
            seoDesc: Yup.string()
                .required(),
            seoAutor: Yup.string()
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

        const seoExiste = await _Seo2.default.findOne({ _id: _id });

        if (!seoExiste) {
            return res.status(400).json({
                error: true,
                code: 109,
                message: "Erro: Seo não encontrado!"
            });
        };

        await _Seo2.default.updateOne({ _id: _id }, req.body, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 111,
                message: "Erro: Seo não editado com sucesso!"
            });

            return res.json({
                error: false,
                message: "Seo editado com sucesso!"
            });
        });
    };

    async delete(req, res) {

        const seoExiste = await _Seo2.default.findOne({ _id: req.params.id });

        if (!seoExiste) {
            return res.status(400).json({
                error: true,
                code: 104,
                message: "Erro: Seo não encontrado"
            });
        };

        await _Seo2.default.deleteOne({ _id: req.params.id }, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 105,
                message: "Error: Seo não apagado com sucesso!"
            });
        });

        return res.json({
            error: false,
            message: "Seo apagado com sucesso!"
        });
    };
};

exports. default = new AdmSeoController();