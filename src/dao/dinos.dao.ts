import db from "../database"
import { DinoDaoI, DinoI } from "../models"

class DinoDao implements DinoDaoI {

    private tableName = 'dinosaurs'

    addDino = async (dino: DinoI): Promise<DinoI> => {
        return (await db<DinoI>(this.tableName).insert(dino).returning('*'))[0]
    }

    getDinoById = async (id: number): Promise<DinoI | undefined> => {
        return (await db<DinoI>(this.tableName).select('*').where('id', id))[0]
    }

    getDinosByLocation = async (location: string): Promise<DinoI[]> => {
        return db<DinoI>(this.tableName).select('*').where('location', location)
    }

    getAllDinos = async (): Promise<DinoI[]> => {
        return db<DinoI>(this.tableName).select('*')
    }

    updateDinoLocation = async (id: number, location: string): Promise<DinoI> => {
        return (await db<DinoI>(this.tableName).update({ location }).where('id', id).returning('*'))[0]
    }

    updateDinoLastFed = async (id: number, last_fed: string): Promise<DinoI> => {
        return (await db<DinoI>(this.tableName).update({ last_fed }).where('id', id).returning('*'))[0]
    }

    removeDino = async (id: number): Promise<number> => {
        return db<DinoI>(this.tableName).delete().where('id', id)
    }

}

export default new DinoDao