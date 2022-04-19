
exports.up = function(knex) {
    return knex.schema.createTable('professor', table => {
        table.string('nome').notNull()
        table.string('telefone').notNull()
        table.string('siape').notNull().unique()

    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('professor')
};
