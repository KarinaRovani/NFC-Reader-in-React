
const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index (request, response) {
        const produto = await connection('produto').select('*');
    
        return response.json(produto); 
    },

    async create(request, response) {
        const{nmProduto, vlProduto} = request.body;

        const idProduto = crypto.randomBytes(4).toString('HEX');
    
        await connection('produto').insert({
            idProduto,
            nmProduto,
            vlProduto,
        })
    
        //console.log(data);
        return response.json({idProduto});
    },

    async delete(request, response){
        const {idProduto} = request.params;
        const produto_id = request.headers.authorization;

        const produto =  await connection('produto')
            .where('idProduto', idProduto)
            .select('produto_id')
            .first();
        if(incident.produto_id != produto_id) {
            return response.status(401).json({error: 'Operation not permitted'});
        }

        await connection('produto').where('idProduto', idProduto).delete();

        return response.status(204).send();
    }
};