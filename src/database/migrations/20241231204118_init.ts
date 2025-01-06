import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('zones', (table) => {
        table.string('id').primary().notNullable()
        table.integer('park_id').notNullable()
        table.dateTime('last_maintained').nullable()
        table.boolean('is_safe').notNullable()
    })
    
    await knex.schema.createTable('dinosaurs', (table) => {
        table.integer('id').primary().notNullable()
        table.string('name').notNullable()
        table.string('species').notNullable()
        table.string('gender').notNullable()
        table.integer('digestion_period_in_hours').notNullable()
        table.boolean('herbivore').notNullable()
        table.integer('park_id').notNullable()
        table.string('location').unsigned().nullable()
        table.dateTime('last_fed').nullable()

        // References
        table
            .foreign('location')
            .references('id')
            .inTable('zones')
            .onDelete('SET NULL')
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('dinosaurs')
    await knex.schema.dropTableIfExists('zones')
}