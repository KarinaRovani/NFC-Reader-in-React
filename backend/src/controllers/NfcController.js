const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const { page = 1 } = request.query;

        const [count] = await connection('nfc').count();

        console.log(count);

        const nfc = await connection('nfc')
            .join('produto', 'produto.idProduto', '=', 'nfc.produto_idProduto')
            .limit(5)
            .offset((page - 1 * 5))
            .select(['nfc.*', 'produto.nmProduto', 'produto.vlProduto']);

        response.header('X-Total-Count', count['count(*)']);    

        return response.json(nfc);
    },

    async create(request, response){
        const {dsNfc} = request.body;
        const produto_idProduto = request.headers.authorization;

        const [idNfc] = await connection('nfc').insert({
            dsNfc,
            produto_idProduto,
        });

        return response.json({idNfc});
    },
  
    async delete(request, response){
        const {idNfc} = request.params;
        const produto_idProduto = request.headers.authorization;

        const incident =  await connection('nfc')
            .where('idNfc', idNfc)
            .select('produto_idProduto')
            .first();
        if(incident.produto_idProduto != produto_idProduto) {
            return response.status(401).json({error: 'Operation not permitted'});
        }

        await connection('nfc').where('idNfc', idNfc).delete();

        return response.status(204).send();
    }
};