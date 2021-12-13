import Seo from '../models/Seo';

class SeoController {

    async index(req, res) {
        Seo.find({}).then((seo) => {
            return res.json({
                error: false,
                seo: seo
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

        /*const dados = {
            "seoPg": "index",
            "seoTitle": "Home - Celke",
            "seoDesc": "Site de ... sobre ...",
            "seoAutor": "Celke"
        }*/

        await Seo.create(req.body, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 102,
                message: "Erro: Seo da página não cadastrado com sucesso!"
            });

            return res.json({
                error: false,
                message: "Seo da página cadastrado com sucesso!"
            });
        });
    };
};

export default new SeoController();