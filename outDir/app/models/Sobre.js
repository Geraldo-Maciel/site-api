"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
var _mongoosepaginatev2 = require('mongoose-paginate-v2'); var _mongoosepaginatev22 = _interopRequireDefault(_mongoosepaginatev2);

const Sobre = new _mongoose2.default.Schema({
    titulo: {
        type: String
    },
    descricao: {
        type: String
    },
    originalName: {
        type: String
    },
    fileName: {
        type: String
    }
},
{
    timestamps: true,
});

Sobre.plugin(_mongoosepaginatev22.default);


exports. default = _mongoose2.default.model('sobre', Sobre);