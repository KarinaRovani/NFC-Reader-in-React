
exports.up = function(knex) {
    return knex.schema.createTable('nfc', function (table){
        table.increments();
        table.string('dsNfc').notNullable();

        table.string('produto_idProduto').notNullable();

        table.foreign('produto_idProduto').references('idProduto').inTable('produto');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('nfc');
};
