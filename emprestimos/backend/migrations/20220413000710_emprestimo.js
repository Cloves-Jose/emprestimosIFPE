
exports.up = function(knex) {
    return knex.schema.createTable('emprestimo', table => {
        table.increments('codigo').primary()
        table.string('siapeProf').references('siape')
            .inTable('professor').notNull()
        table.string('codItem').references('codigo')
            .inTable('item').notNull()
        table.datetime('dataEmp').notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('emprestimo')
};