import { Knex } from "knex";
import { TableNames } from "../../utils";
import { DinoI } from "../../models";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex.raw('TRUNCATE TABLE "zones" RESTART IDENTITY CASCADE')
    await knex.raw('TRUNCATE TABLE "dinosaurs" RESTART IDENTITY CASCADE')

    // Inserts seed entries
    await knex<DinoI>(TableNames.DINOSAURS).insert([
        { 
            id: 1,
            digestion_period_in_hours: 24,
            gender: "female",
            herbivore: true,
            name: 'test',
            park_id: 1,
            species: 'dinorex'
        },
        
    ]);
};