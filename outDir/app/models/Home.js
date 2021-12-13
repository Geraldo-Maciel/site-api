"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);

const Home = new _mongoose2.default.Schema({
    topTitulo: {
        type: String
    },
    topSubtitulo: {
        type: String
    },
    topTextBtn: {
        type: String
    },
    topLinkBtn: {
        type: String
    },
    topOriginalName: {
        type: String
    } ,
    topFileName: {
        type: String
    },   
    
    servTitulo: {
        type: String
    },
    servSubtitulo: {
        type: String
    },    
    servUmIcone: {
        type: String
    },
    servUmTitulo: {
        type: String
    },
    servUmDesc: {
        type: String
    },    
    servDoisIcone: {
        type: String
    },
    servDoisTitulo: {
        type: String
    },
    servDoisDesc: {
        type: String
    },
    servTresIcone: {
        type: String
    },
    servTresTitulo: {
        type: String
    },
    servTresDesc: {
        type: String
    },

    acaoTitulo: {
        type: String
    },
    acaoSubtitulo: {
        type: String
    },
    acaoDesc: {
        type: String
    },
    acaoTextBtn: {
        type: String
    },
    acaoLinkBtn: {
        type: String
    },
    acaoOriginalName: {
        type: String
    } ,
    acaoFileName: {
        type: String
    },  

    detServTitulo: {
        type: String
    },
    detSubtitulo: {
        type: String
    },
    detDesc: {
        type: String
    },
    detOriginalName: {
        type: String
    } ,
    detFileName: {
        type: String
    },
},
{
    timestamps: true,
});


exports. default = _mongoose2.default.model('home', Home);