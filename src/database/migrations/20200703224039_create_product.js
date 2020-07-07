
exports.up = function(knex) {
    return knex.schema.createTable('product', function (table) {
        table.increments();
        table.string('name').notNullable();
        table.string('description').notNullable();
        table.string('category').notNullable();
        table.decimal('price').notNullable();
        table.decimal('stock_quantity').notNullable();
        
        table.string('user_id').notNullable();
        table.foreign('user_id').references('id').inTable('user');
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('product');
};
