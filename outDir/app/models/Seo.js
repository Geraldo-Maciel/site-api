"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
var _mongoosepaginatev2 = require('mongoose-paginate-v2'); var _mongoosepaginatev22 = _interopRequireDefault(_mongoosepaginatev2);

const Seo = new _mongoose2.default.Schema({
    seoPg: {
        type: String
    },
    seoTitle: {
        type: String
    },
    seoDesc: {
        type: String
    },
    seoAutor: {
        type: String
    },
},
{
    timestamps: true,
});

Seo.plugin(_mongoosepaginatev22.default);

exports. default = _mongoose2.default.model('seo', Seo);