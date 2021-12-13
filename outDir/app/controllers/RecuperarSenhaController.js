"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _nodemailer = require('nodemailer'); var _nodemailer2 = _interopRequireDefault(_nodemailer);
var _config = require('../../config/config'); var _config2 = _interopRequireDefault(_config);
var _email = require('../../config/email'); var _email2 = _interopRequireDefault(_email);

class RecuperarSenhaController {

    async show(req, res) {
        /*await sleep(3000);

        function sleep(ms) {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
            });
        }*/

        _User2.default.findOne({ recuperarSenha: req.params.recuperarSenha }, '_id').then((user) => {
            if (user._id) {
                return res.json({
                    error: false,
                    user: user
                })
            }
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 103,
                messsage: "Erro: URL inválida!"
            });
        })
    };

    async store(req, res) {

        /*await sleep(3000);

        function sleep(ms) {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
            });
        }*/

        const schema = Yup.object().shape({
            email: Yup.string()
                .required()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                code: 101,
                messsage: "Erro: Dados inválidos!"
            });
        };

        var dados = req.body;
        const userExiste = await _User2.default.findOne({ email: dados.email }, '_id name email');
        if (!userExiste) {
            return res.status(400).json({
                error: true,
                code: 102,
                message: "Error: Nenhum usuário encontrado com esse e-mail!"
            });
        };

        dados.recuperarSenha = Math.random().toString(36).substr(3, 10);

        await _User2.default.updateOne({ email: dados.email }, dados, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 111,
                message: "Erro: Não foi possível executar a solicitação!"
            });

            var transport = _nodemailer2.default.createTransport({
                host: _email2.default.host,
                port: _email2.default.port,
                auth: {
                    user: _email2.default.user,
                    pass: _email2.default.pass,
                }
            });

            var emailHtml = 'Prezado(a) ' + userExiste.name + '<br><br> Você solicitou uma alteração de senha.<br>Seguindo o link abaixo você poderá alterar sua senha.<br>Para continuar o processo de recuperação de sua senha, clique no link abaixo ou cole o endereço abaixo no seu navegador.<br><br>' + _config2.default.urlSite + '/atualizar-senha-login/' + dados.recuperarSenha + '<br><br>Usuário: ' + userExiste.email + '<br><br>Se você não solicitou essa alteração, nenhuma ação é necessária. Sua senha permanecerá a mesma até que você ative este código';

            var emailTexto = 'Prezado(a) ' + userExiste.name + '\n\nVocê solicitou uma alteração de senha.\nSeguindo o link abaixo você poderá alterar sua senha.\nPara continuar o processo de recuperação de sua senha, clique no link abaixo ou cole o endereço abaixo no seu navegador.\n\n' + _config2.default.urlSite + '/atualizar-senha-login/' + dados.recuperarSenha + '\n\nUsuário: ' + userExiste.email + '\n\nSe você não solicitou essa alteração, nenhuma ação é necessária. Sua senha permanecerá a mesma até que você ative este código';

            var emailSerEnviado = {
                from: _email2.default.from,
                to: userExiste.email,
                subject: 'Instruções para recuperar a senha',
                html: emailHtml,
                text: emailTexto
            }

            transport.sendMail(emailSerEnviado, function (error) {
                if (error) return res.status(400).json({
                    error: true,
                    code: 111,
                    message: "Erro: Não foi possível executar a solicitação!"
                });

                return res.json({
                    error: false,
                    message: "Enviado no e-mail as intruções para recuperar a senha, verifique sua caixa de entrada!"
                });
            });
        });
    };

    async update(req, res) {

        /*await sleep(3000);

        function sleep(ms) {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
            });
        } */      

        const schema = Yup.object().shape({
            _id: Yup.string()
                .required(),
            recuperarSenha: Yup.string()
                .required(),
            password: Yup.string()
                .required()
                .min(6)
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                code: 101,
                messsage: "Erro: Dados inválidos!"
            });
        };

        const { _id, recuperarSenha } = req.body;

        const usuarioExiste = await _User2.default.findOne({ _id: _id }, '_id');
        if (!usuarioExiste) {
            return res.status(400).json({
                error: true,
                code: 102,
                messsage: "Erro: Usuário não encontrado!"
            });
        }

        const validarChave = await _User2.default.findOne({ recuperarSenha: recuperarSenha }, '_id');
        if (!validarChave) {
            return res.status(401).json({
                error: true,
                code: 110,
                message: "Erro: URL inválida!"
            })
        }

        var dados = req.body;
        if (dados.password) {
            dados.password = await _bcryptjs2.default.hash(dados.password, 8);
            dados.recuperarSenha = null;
        };

        await _User2.default.updateOne({ _id: dados._id }, dados, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 111,
                message: "Erro: Senha não foi editada com sucesso!"
            });

            return res.json({
                error: false,
                message: "Senha editada com sucesso!"
            });
        });
    };

};

exports. default = new RecuperarSenhaController();