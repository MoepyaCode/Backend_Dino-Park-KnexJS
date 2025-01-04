import { NextFunction, Request, Response } from "express"

/**
 * Model Zones (Managed by Events)
 * Any update function gets called in Events
 * 
 * Zone:
 * A Zone can have more than one Dino
 * BUT Herbivores and Carnivores cannot be in same Zone (resolve MANY TO MANY)
 */

declare interface ZoneI {
    id: string
    park_id: number
    last_maintained: string | null
    is_safe: boolean
}

declare interface ZoneDaoI {
    addZone: (id: string) => Promise<ZoneI | undefined>
    getZoneById: (id: string) => Promise<ZoneI | undefined>
    getAllZones: () => Promise<ZoneI[]>
    getAllSafeZones: () => Promise<ZoneI[]>
    getAllUnSafeZones: () => Promise<ZoneI[]>
    getNullMaintainedZones: () => Promise<ZoneI[]>                  // Has no "last_maintained" date
    getMaintainedZones: () => Promise<ZoneI[]>
    getMaintenanceDueZones: () => Promise<ZoneI[]>                  // Has 7 days left before maintenance
    updateZoneSafety: (id: string, is_safe: boolean) => Promise<ZoneI | undefined>
    updateZoneMaintenance: (id: string, last_maintained: string) => Promise<ZoneI | undefined>
}

declare interface ZoneServiceI {
    addZone: (dto: any) => Promise<ZoneI | undefined>
    init: () => Promise<void>
    getZoneById: (dto: any) => Promise<ZoneI | undefined>
    getAllZones: () => Promise<ZoneI[]>
    getAllSafeZones: () => Promise<ZoneI[]>
    getAllUnSafeZones: () => Promise<ZoneI[]>
    // updateZoneSafety: (dto: any) => Promise<ZoneI | undefined>                  // Call in Events
    // updateZoneMaintenance: (dto: any) => Promise<ZoneI | undefined>             // Call in Events
}

declare interface ZoneControllerI {
    getZoneById: (request: Request, response: Response, next: NextFunction) => Promise<void>
    getAllZones: (request: Request, response: Response, next: NextFunction) => Promise<void>
    getAllSafeZones: (request: Request, response: Response, next: NextFunction) => Promise<void>
    getAllUnsafeZones: (request: Request, response: Response, next: NextFunction) => Promise<void>
}