
exports.up = function(knex) {
  return knex.schema.createTable('surf_env', (table) => {
    table.increments('id').primary();
    table.integer('season');
    table.string('key');
    table.text('value');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('surf_env');
};
