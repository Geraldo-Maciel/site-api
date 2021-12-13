"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);

const Contato = new _mongoose2.default.Schema({
    tituloHorarioCont: {
        type: String
    },
    horarioCont: {
        type: String
    },
    tituloEnd: {
        type: String
    },
    logradouroEnd: {
        type: String
    },
    bairroEnd: {
        type: String
    } ,
    telCont: {
        type: String
    },      
    whatsappCont: {
        type: String
    }
},
{
    timestamps: true,
});


exports. default = _mongoose2.default.model('contato', Contato);