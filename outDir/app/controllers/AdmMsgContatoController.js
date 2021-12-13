"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _MsgContato = require('../models/MsgContato'); var _MsgContato2 = _interopRequireDefault(_MsgContato);

class AdmMsgContatoController {

    async index(req, res) {

        /*await sleep(3000);

        function sleep(ms) {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
            });
        }*/

        const { page = 1 } = req.query;
        const { limit = 40 } = req.query;
        await _MsgContato2.default.paginate({}, { select: '_id nome email assuntoMsg', page, limit, sort: '-createdAt' }).then((msgContatos) => {
            return res.json({
                error: false,
                msgContatos: msgContatos
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

        /*await sleep(3000);

        function sleep(ms) {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
            });
        }*/

        _MsgContato2.default.findOne({ _id: req.params.id }).then((msgContato) => {

            return res.json({
                error: false,
                msgContato: msgContato
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
            nome: Yup.string()
                .required(),
            email: Yup.string()
                .email()
                .required(),
            assuntoMsg: Yup.string()
                .required(),
            conteudoMsg: Yup.string()
                .required()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                code: 103,
                message: "Error: Dados inválidos!"
            });
        };

        /*await sleep(3000);

        function sleep(ms) {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
            });
        }*/

        await _MsgContato2.default.create(req.body, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 101,
                message: "Error: Mensagem de contato não cadastrada com sucesso!"
            });

            return res.status(200).json({
                error: false,
                message: "Mensagem de contato cadastrada com sucesso!"
            })
        });
    };

    async update(req, res) {
        /*await sleep(5000);

        function sleep(ms) {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
            });
        }*/

        const schema = Yup.object().shape({
            nome: Yup.string()
                .required(),
            email: Yup.string()
                .email()
                .required(),
            assuntoMsg: Yup.string()
                .required(),
            conteudoMsg: Yup.string()
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

        const msgContatoExiste = await _MsgContato2.default.findOne({ _id: _id });

        if (!msgContatoExiste) {
            return res.status(400).json({
                error: true,
                code: 109,
                message: "Erro: mensagem de contato não encontrada!"
            });
        };

        await _MsgContato2.default.updateOne({ _id: _id }, req.body, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 111,
                message: "Erro: Mensagem de contato não editada com sucesso!"
            });

            return res.json({
                error: false,
                message: "Mensagem de contato editada com sucesso!"
            });
        });
    };

    async delete(req, res) {

        /*await sleep(3000);

        function sleep(ms) {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
            });
        }  */

        const msgContatoExiste = await _MsgContato2.default.findOne({ _id: req.params.id });

        if (!msgContatoExiste) {
            return res.status(400).json({
                error: true,
                code: 104,
                message: "Erro: Mensagem de contato não encontrada"
            });
        };

        await _MsgContato2.default.deleteOne({ _id: req.params.id }, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 105,
                message: "Error: Mensagem de contato não apagada com sucesso!"
            });
        });

        return res.json({
            error: false,
            message: "Mensagem de contato apagada com sucesso!"
        });
    };
};

exports. default = new AdmMsgContatoController();