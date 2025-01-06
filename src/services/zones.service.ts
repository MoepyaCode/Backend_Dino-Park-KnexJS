import _, { floor, isNull } from "lodash";
import { zonesDao } from "../dao";
import { ZoneI, ZoneServiceI } from "../models";

export enum ZoneExistError {
    Exists,
    NotExist
}

class ZoneService implements ZoneServiceI {

    addZone = async (id: string): Promise<ZoneI | undefined> => {
        const { zone } = await this.zoneExistCheck(id)

        if (zone) throw new Error(this.errorStrings(ZoneExistError.Exists, id))

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

    getZoneById = async (id: string): Promise<ZoneI> => {
        const { zone } = await this.zoneExistCheck(id)

        if (!zone) throw new Error(this.errorStrings(ZoneExistError.NotExist, id))

        return zone
    }

    getAllZones = async (): Promise<ZoneI[]> => {
        return zonesDao.getAllZones()
    }

    getAllSafeZones = async (): Promise<ZoneI[]> => {
        return zonesDao.getAllSafeZones()
    }

    getAllUnSafeZones = async (): Promise<ZoneI[]> => {
        return zonesDao.getAllUnSafeZones()
    }

    getMaintenanceDueZones = async (): Promise<ZoneI[]> => {
        const zones = (await this.getAllZones())

        return zones.filter(zone => {
            if(isNull(zone.last_maintained)) return true

            const currentDate = new Date()
            const lastMaintained = new Date(zone.last_maintained)
            const diffInMilliSeconds = currentDate.getTime() - lastMaintained.getTime()
            const differenceInDays = Math.floor(diffInMilliSeconds / (1000 * 60 * 60 * 24))

            if(differenceInDays >= 25) return true

            return false
        })
    }

    updateZoneSafety = async (id: string, is_safe: boolean): Promise<ZoneI> => {
        const { zone } = await this.zoneExistCheck(id)

        if (!zone) throw new Error(this.errorStrings(ZoneExistError.NotExist, id))

        await zonesDao.updateZoneSafety(id, is_safe)
        return this.getZoneById(id)
    }

    updateZoneMaintenance = async (id: string): Promise<ZoneI> => {
        const { zone } = await this.zoneExistCheck(id)

        if (!zone) throw new Error(this.errorStrings(ZoneExistError.NotExist, id))

        const date = new Date().toISOString()
        await zonesDao.updateZoneMaintenance(id, date)

        return this.getZoneById(id)
    }

    /**
     * Checks if Zone exists
     * @param id 
     * @returns {{ zone: ZoneI | undefined, exists: boolean }}
     */
    zoneExistCheck = async (id: string | undefined | null): Promise<{ zone: ZoneI | undefined, exists: boolean | undefined }> => {

        if (_.isUndefined(id) || _.isNull(id)) return { zone: undefined, exists: undefined }

        const zone = await zonesDao.getZoneById(id)

        if (_.isUndefined(zone)) return { zone, exists: false }

        return { zone, exists: true }
    }

    /**
     * Provides errors based on a specific request
     * @param error 
     * @param id 
     * @returns { string }
     */
    errorStrings = (error: ZoneExistError, id: string | undefined | null): string => {
        switch (error) {
            case ZoneExistError.Exists:
                return `Zone with ID "${id}" already exists!`
            case ZoneExistError.NotExist:
                return `Zone '${id}' does not exist!`
            default:
                throw new Error('Incorrect error message request!')
        }
    }

}

export default new ZoneService()