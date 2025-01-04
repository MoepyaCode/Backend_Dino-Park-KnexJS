import _ from "lodash";
import { zonesDao } from "../dao";
import { ZoneI, ZoneServiceI } from "../models";

class ZoneService implements ZoneServiceI {

    addZone = async (dto: any): Promise<ZoneI | undefined> => {
        let { id } = dto

        const zone = zonesDao.getZoneById(id)

        if(!_.isUndefined(zone)) throw new Error(`Zone with ID "${id}" already exists!`)

        return zonesDao.addZone(id)
    }

    init = async () => {
        const zones = await zonesDao.getAllZones()

        if (!_.isEmpty(zones)) return

        const columns = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        const maxRows = 16

        try {
            for (let row = 1; row <= maxRows; row++) {
                for (const column of columns) {
                    await zonesDao.addZone(`${column}${row}`.toUpperCase())
                }
            }

            console.log("Successfully initialized the Zones!")
        } catch (error) {
            throw new Error('Unexpected error while saving zones to database!')
        }
    }

    getZoneById = (dto: any): Promise<ZoneI | undefined> => {
        let { id } = dto
        
        return this.zoneExistCheck(id)
    }

    getAllZones = (): Promise<ZoneI[]> => {
        return zonesDao.getAllZones()
    }

    getAllSafeZones = (): Promise<ZoneI[]> => {
        return zonesDao.getAllSafeZones()
    }

    getAllUnSafeZones = (): Promise<ZoneI[]> => {
        return zonesDao.getAllUnSafeZones()
    }

    /**
     * Checks if Zone exists
     * @param id 
     * @returns {ZoneI}
     */
    private zoneExistCheck = async (id: string): Promise<ZoneI> => {
        const zone = await zonesDao.getZoneById(id)

        if (_.isUndefined(zone)) throw new Error(`Zone '${id}' does not exist!`)

        return zone
    }

}

export default new ZoneService()