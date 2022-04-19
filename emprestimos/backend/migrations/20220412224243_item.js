
exports.up = function(knex) {
    return knex.schema.createTable('item', table => {
        table.string('tipo').notNull()
        table.string('codigo').notNull().unique()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('item')
};
