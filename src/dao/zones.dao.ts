import db from "../database";
import { ZoneDaoI, ZoneI } from "../models";

class ZoneDao implements ZoneDaoI {

    private tableName = 'zones'

    addZone = async (id: string): Promise<ZoneI> => {
        return (await db<ZoneI>(this.tableName)
            .insert({ id, park_id: 1, last_maintained: null, is_safe: false })
            .returning('*'))[0]
    }

    getZoneById = async (id: string): Promise<ZoneI | undefined> => {
        return (await db<ZoneI>(this.tableName).select('*').where('id', id))[0]
    }

    getAllZones = async (): Promise<ZoneI[]> => {
        return db<ZoneI>(this.tableName).select('*')
    }

    getAllSafeZones = async (): Promise<ZoneI[]> => {
        return db<ZoneI>(this.tableName).select('*').where('is_safe', true)
    }

    getAllUnSafeZones = async (): Promise<ZoneI[]> => {
        return db<ZoneI>(this.tableName).select('*').where('is_safe', false)
    }

    updateZoneSafety = async (id: string, is_safe: boolean): Promise<ZoneI> => {
        return db<ZoneI>(this.tableName).where('id', id).update({ is_safe })
    }

    updateZoneMaintenance = async (id: string, last_maintained: string): Promise<ZoneI> => {
        return db<ZoneI>(this.tableName).where('id', id).update({ last_maintained })
    }

}

export default new ZoneDao()