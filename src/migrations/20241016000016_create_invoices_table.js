/**
 * Migration: Create invoices table
 * @param {import('knex').Knex} knex
 */
exports.up = function(knex) {
  return knex.schema.createTable('invoices', function(table) {
    table.increments('id').primary();
    table.string('invoiceNumber', 50).notNullable().unique();
    table.date('invoiceDate').notNullable();
    table.date('dueDate').nullable();
    
    // Client Details
    table.string('clientName', 255).notNullable();
    table.string('clientEmail', 255).nullable();
    table.string('clientPhone', 20).nullable();
    table.text('clientAddress').nullable();
    
    // Invoice Items (JSON array)
    table.text('items').notNullable();
    
    // Amounts
    table.decimal('subtotal', 10, 2).notNullable();
    table.decimal('tax', 10, 2).defaultTo(0);
    table.decimal('discount', 10, 2).defaultTo(0);
    table.decimal('total', 10, 2).notNullable();
    
    // Payment
    table.decimal('paidAmount', 10, 2).defaultTo(0);
    table.enum('paymentStatus', ['unpaid', 'partial', 'paid']).defaultTo('unpaid');
    
    // Additional Info
    table.text('notes').nullable();
    table.text('terms').nullable();
    
    // Booking Reference
    table.integer('bookingId').unsigned().nullable();
    
    table.boolean('isDeleted').defaultTo(false);
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
    
    table.index('invoiceNumber');
    table.index('invoiceDate');
    table.index('paymentStatus');
    table.index('isDeleted');
  });
};

/**
 * @param {import('knex').Knex} knex
 */
exports.down = function(knex) {
  return knex.schema.dropTable('invoices');
};


