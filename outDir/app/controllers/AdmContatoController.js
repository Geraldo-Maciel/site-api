"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _Contato = require('../models/Contato'); var _Contato2 = _interopRequireDefault(_Contato);

class AdmContatoController {

    async show(req, res) {
        _Contato2.default.findOne({}).then((contato) => {
            return res.json({
                error: false,
                contato: contato
            });
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 106,
                message: "Erro: Não foi possível executar a solicitação!"
            });
        });
    };

    async store(req, res) {

        const contatoExiste = await _Contato2.default.findOne({});
        if (contatoExiste) {
            return res.status(400).json({
                error: true,
                code: 103,
                message: "Erro: A página contato já possui um registro!"
            })
        }

        const dados = {
            "tituloHorarioCont": "Entre em contato - ...",
            "horarioCont": "Segunda a Sexta: 08:30 às 12:00 e 13:30 às 18:00",
            "tituloEnd": "Endereço.",
            "logradouroEnd": "Avenida Winston Churchill, 936",
            "bairroEnd": "Capão Raso - Curitiba",
            "telCont": "(xx) xxxx-xxxx",
            "whatsappCont": "(xx) xxxx-xxxx"
        }

        await _Contato2.default.create(dados, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 102,
                message: "Erro: Dados da página contato não cadastrado com sucesso!"
            });

            return res.json({
                error: false,
                message: "Dados da página contato cadastrado com sucesso!"
            });
        });
    };

    async update(req, res) {
        /*await sleep(3000);

        function sleep(ms) {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
            });
        }*/

        const schema = Yup.object().shape({
            tituloHorarioCont: Yup.string()
                .required(),
            horarioCont: Yup.string()
                .required(),
            tituloEnd: Yup.string()
                .required(),
            logradouroEnd: Yup.string()
                .required(),
            bairroEnd: Yup.string()
                .required(),
            telCont: Yup.string()
                .required(),
            whatsappCont: Yup.string()
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

        const contatoExiste = await _Contato2.default.findOne({ _id: _id });

        if (!contatoExiste) {
            return res.status(400).json({
                error: true,
                code: 109,
                message: "Erro: Conteúdo da página contato não encontrado!"
            });
        };

        await _Contato2.default.updateOne({ _id: _id }, req.body, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 111,
                message: "Erro: Conteúdo da página contato não editada com sucesso!"
            });

            return res.json({
                error: false,
                message: "Conteúdo da página de contato editado com sucesso!"
            });
        });
    };
};

exports. default = new AdmContatoController();