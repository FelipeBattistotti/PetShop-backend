
exports.up = function(knex) {
    return knex.schema.createTable('user', function (table) {
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('pwd').notNullable();
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('user');
};
