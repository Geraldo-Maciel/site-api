"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _uploadImgUser = require('./app/middlewares/uploadImgUser'); var _uploadImgUser2 = _interopRequireDefault(_uploadImgUser);
var _uploadImgSobre = require('./app/middlewares/uploadImgSobre'); var _uploadImgSobre2 = _interopRequireDefault(_uploadImgSobre);
var _uploadImgHome = require('./app/middlewares/uploadImgHome'); var _uploadImgHome2 = _interopRequireDefault(_uploadImgHome);

var _LoginController = require('./app/controllers/LoginController'); var _LoginController2 = _interopRequireDefault(_LoginController);
var _RecuperarSenhaController = require('./app/controllers/RecuperarSenhaController'); var _RecuperarSenhaController2 = _interopRequireDefault(_RecuperarSenhaController);
var _UserController = require('./app/controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _PerfilController = require('./app/controllers/PerfilController'); var _PerfilController2 = _interopRequireDefault(_PerfilController);
var _PerfilImagemController = require('./app/controllers/PerfilImagemController'); var _PerfilImagemController2 = _interopRequireDefault(_PerfilImagemController);

var _HomeController = require('./app/controllers/HomeController'); var _HomeController2 = _interopRequireDefault(_HomeController);
var _SobreController = require('./app/controllers/SobreController'); var _SobreController2 = _interopRequireDefault(_SobreController);
var _ContatoController = require('./app/controllers/ContatoController'); var _ContatoController2 = _interopRequireDefault(_ContatoController);
var _MsgContatoController = require('./app/controllers/MsgContatoController'); var _MsgContatoController2 = _interopRequireDefault(_MsgContatoController);

var _AdmMsgContatoController = require('./app/controllers/AdmMsgContatoController'); var _AdmMsgContatoController2 = _interopRequireDefault(_AdmMsgContatoController);
var _AdmSobreController = require('./app/controllers/AdmSobreController'); var _AdmSobreController2 = _interopRequireDefault(_AdmSobreController);
var _AdmSobreImagemController = require('./app/controllers/AdmSobreImagemController'); var _AdmSobreImagemController2 = _interopRequireDefault(_AdmSobreImagemController);
var _AdmContatoController = require('./app/controllers/AdmContatoController'); var _AdmContatoController2 = _interopRequireDefault(_AdmContatoController);
var _AdmRodapeController = require('./app/controllers/AdmRodapeController'); var _AdmRodapeController2 = _interopRequireDefault(_AdmRodapeController);
var _AdmHomeController = require('./app/controllers/AdmHomeController'); var _AdmHomeController2 = _interopRequireDefault(_AdmHomeController);
var _AdmHomeTopoController = require('./app/controllers/AdmHomeTopoController'); var _AdmHomeTopoController2 = _interopRequireDefault(_AdmHomeTopoController);
var _AdmHomeServController = require('./app/controllers/AdmHomeServController'); var _AdmHomeServController2 = _interopRequireDefault(_AdmHomeServController);
var _AdmHomeAcaoController = require('./app/controllers/AdmHomeAcaoController'); var _AdmHomeAcaoController2 = _interopRequireDefault(_AdmHomeAcaoController);
var _AdmHomeDetController = require('./app/controllers/AdmHomeDetController'); var _AdmHomeDetController2 = _interopRequireDefault(_AdmHomeDetController);
var _AdmHomeTopoImgController = require('./app/controllers/AdmHomeTopoImgController'); var _AdmHomeTopoImgController2 = _interopRequireDefault(_AdmHomeTopoImgController);
var _AdmHomeAcaoImgController = require('./app/controllers/AdmHomeAcaoImgController'); var _AdmHomeAcaoImgController2 = _interopRequireDefault(_AdmHomeAcaoImgController);
var _AdmHomeDetImgController = require('./app/controllers/AdmHomeDetImgController'); var _AdmHomeDetImgController2 = _interopRequireDefault(_AdmHomeDetImgController);

var _AdmSeoController = require('./app/controllers/AdmSeoController'); var _AdmSeoController2 = _interopRequireDefault(_AdmSeoController);

var _auth = require('./app/middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);

const routes = new (0, _express.Router)();
const uploadImgUser = _multer2.default.call(void 0, _uploadImgUser2.default);
const uploadImgSobre = _multer2.default.call(void 0, _uploadImgSobre2.default);
const uploadImgHome = _multer2.default.call(void 0, _uploadImgHome2.default);

routes.get('/users', _UserController2.default.index);
routes.get('/users/:id', _UserController2.default.show);
routes.post('/users', _UserController2.default.store);
routes.put('/users', _auth2.default, _UserController2.default.update);
routes.delete('/users/:id', _auth2.default, _UserController2.default.delete);

routes.get('/perfil', _auth2.default, _PerfilController2.default.show);
routes.put('/perfil', _auth2.default, _PerfilController2.default.update);
routes.put('/perfil-img', _auth2.default, uploadImgUser.single('file'),  _PerfilImagemController2.default.update);

routes.post('/login', _LoginController2.default.store);

routes.post('/recuperar-senha', _RecuperarSenhaController2.default.store);
routes.get('/recuperar-senha/:recuperarSenha', _RecuperarSenhaController2.default.show);
routes.put('/recuperar-senha', _RecuperarSenhaController2.default.update);

routes.get('/home', _HomeController2.default.show);

routes.get('/sobre', _SobreController2.default.index);

routes.get('/contato', _ContatoController2.default.show);
routes.post('/msg-contato', _MsgContatoController2.default.store);

routes.get('/adm-msg-contato', _auth2.default, _AdmMsgContatoController2.default.index);
routes.get('/adm-msg-contato/:id', _auth2.default, _AdmMsgContatoController2.default.show);
routes.post('/adm-msg-contato', _auth2.default, _AdmMsgContatoController2.default.store);
routes.put('/adm-msg-contato', _auth2.default, _AdmMsgContatoController2.default.update);
routes.delete('/adm-msg-contato/:id', _auth2.default, _AdmMsgContatoController2.default.delete);

routes.get('/adm-sobre', _auth2.default, _AdmSobreController2.default.index);
routes.get('/adm-sobre/:id', _auth2.default, _AdmSobreController2.default.show);
routes.post('/adm-sobre', _auth2.default, uploadImgSobre.single('file'), _AdmSobreController2.default.store);
routes.put('/adm-sobre', _auth2.default, _AdmSobreController2.default.update);
routes.delete('/adm-sobre/:id', _auth2.default, _AdmSobreController2.default.delete);
routes.put('/adm-sobre-img', _auth2.default, uploadImgSobre.single('file'), _AdmSobreImagemController2.default.update);

routes.post('/adm-contato', _auth2.default, _AdmContatoController2.default.store);
routes.get('/adm-contato', _auth2.default, _AdmContatoController2.default.show);
routes.put('/adm-contato', _auth2.default, _AdmContatoController2.default.update);

routes.post('/adm-rodape', _auth2.default, _AdmRodapeController2.default.store);
routes.get('/adm-rodape', _auth2.default, _AdmRodapeController2.default.show);
routes.put('/adm-rodape', _auth2.default, _AdmRodapeController2.default.update);

routes.get('/adm-home', _auth2.default, _AdmHomeController2.default.show);
routes.post('/adm-home', _auth2.default, _AdmHomeController2.default.store);
routes.get('/adm-home-topo', _auth2.default, _AdmHomeTopoController2.default.show);
routes.put('/adm-home-topo', _auth2.default, _AdmHomeTopoController2.default.update);
routes.get('/adm-home-serv', _auth2.default, _AdmHomeServController2.default.show);
routes.put('/adm-home-serv', _auth2.default, _AdmHomeServController2.default.update);
routes.get('/adm-home-acao', _auth2.default, _AdmHomeAcaoController2.default.show);
routes.put('/adm-home-acao', _auth2.default, _AdmHomeAcaoController2.default.update);
routes.get('/adm-home-det', _auth2.default, _AdmHomeDetController2.default.show);
routes.put('/adm-home-det', _auth2.default, _AdmHomeDetController2.default.update);  
routes.get('/adm-home-topo-img', _auth2.default, _AdmHomeTopoImgController2.default.show);
routes.put('/adm-home-topo-img', _auth2.default, uploadImgHome.single('file'), _AdmHomeTopoImgController2.default.update);
routes.get('/adm-home-acao-img', _auth2.default, _AdmHomeAcaoImgController2.default.show);
routes.put('/adm-home-acao-img', _auth2.default, uploadImgHome.single('file'), _AdmHomeAcaoImgController2.default.update);
routes.get('/adm-home-det-img', _auth2.default, _AdmHomeDetImgController2.default.show);
routes.put('/adm-home-det-img', _auth2.default, uploadImgHome.single('file'), _AdmHomeDetImgController2.default.update);

routes.get('/adm-seo', _auth2.default, _AdmSeoController2.default.index);
routes.get('/adm-seo/:id', _auth2.default, _AdmSeoController2.default.show);
routes.post('/adm-seo', _auth2.default, _AdmSeoController2.default.store);
routes.put('/adm-seo', _auth2.default, _AdmSeoController2.default.update);
routes.delete('/adm-seo/:id', _auth2.default, _AdmSeoController2.default.delete);

exports. default = routes;
