
exports.up = function(knex) {
    return knex.schema.createTable('produto', function (table){
        table.string('idProduto').primary();
        table.string('nmProduto').notNullable();
        table.decimal('vlProduto').notNullable();
    });
  
};

exports.down = function(knex) {
  return knex.schema.dropTable('produto');
};