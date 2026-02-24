exports.up = async function (knex) {
  await knex.schema.alterTable('bookings', function (table) {
    table.dropIndex('service'); // drop index first (if exists)
  });

  await knex.schema.alterTable('bookings', function (table) {
    table.text('service').alter();
  });
};

exports.down = async function (knex) {
  await knex.schema.alterTable('bookings', function (table) {
    table.string('service', 255).alter();
    table.index('service');
  });
};