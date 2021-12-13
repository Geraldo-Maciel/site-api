"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _nodemailer = require('nodemailer'); var _nodemailer2 = _interopRequireDefault(_nodemailer);
var _email = require('../../config/email'); var _email2 = _interopRequireDefault(_email);

var _MsgContato = require('../models/MsgContato'); var _MsgContato2 = _interopRequireDefault(_MsgContato);

class SobreController {

    async store(req, res) {

        /*await sleep(3000);

        function sleep(ms) {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
            });
        }*/

        /*const dados = {
            "nome": "Cesar",
            "email": "cesar@celke.com.br",
            "assuntoMsg": "Assunto 1",
            "conteudoMsg": "Conteúdo 1"
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
                code: 103,
                message: "Error: Dados inválidos!"
            });
        };

        await _MsgContato2.default.create(req.body, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 102,
                message: "Erro: Contato não enviado com sucesso!"
            });

            var transport = _nodemailer2.default.createTransport({
                host: _email2.default.host,
                port: _email2.default.port,
                auth: {
                    user: _email2.default.user,
                    pass: _email2.default.pass,
                }
            });

            const { nome, email, assuntoMsg, conteudoMsg } = req.body;

            var emailHtml = 'Prezado(a) ' + nome + '<br><br> Recebi a sua mensagem<br><br>Em breve estaremos respondendo';

            var emailTexto = 'Prezado(a) ' + nome + '\n\nRecebi a sua mensagem\n\nEm breve estaremos respondendo';

            var emailSerEnviado = {
                from: _email2.default.from,
                to: email,
                subject: 'Recebi a sua mensagem',
                html: emailHtml,
                text: emailTexto
            }

            transport.sendMail(emailSerEnviado, function (error) {

                var emailHtmlAdm = 'Nova mensagem de contato<br><br>Nome: ' + nome + '<br>E-mail: ' + email + '<br>Assunto: ' + assuntoMsg + '<br>Conteúdo' + conteudoMsg;

                var emailTextoAdm = 'Nova mensagem de contato\n\nNome: ' + nome + '\nE-mail: ' + email + '\nAssunto: ' + assuntoMsg + '\nConteúdo: ' + conteudoMsg;

                var emailSerEnviado = {
                    from: _email2.default.from,
                    to: _email2.default.from,
                    subject: 'Nova mensagem',
                    html: emailHtmlAdm,
                    text: emailTextoAdm
                }

                transport.sendMail(emailSerEnviado, function (error) {

                });                
            });

            return res.json({
                error: false,
                message: "Contato enviado com sucesso!"
            });
        });
    };
};

exports. default = new SobreController();