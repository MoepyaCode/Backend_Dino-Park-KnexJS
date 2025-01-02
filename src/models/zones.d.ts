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
    location: string
    park_id: number
    last_maintained: string
    is_safe: boolean
}

declare interface ZoneDaoI {
    addZone: (location: string) => Promise<ZoneI>
    getZone: (location: string) => Promise<ZoneI>
    getAllZones: () => Promise<ZoneI[]>
    getAllSafeZones: () => Promise<ZoneI[]>
    getAllUnSafeZones: () => Promise<ZoneI[]>
    getNoneMaintainedZones: () => Promise<ZoneI[]>                  // Has no "last_maintained" date
    getMaintainedZones: () => Promise<ZoneI[]>
    getMaintenanceDueZones: () => Promise<ZoneI[]>                  // Has 7 days left before maintenance
    updateZoneSafety: (location: string, is_safe: boolean) => Promise<ZoneI>
    updateZoneMaintenance: (location: string, last_maintained: string) => Promise<ZoneI>
}

declare interface ZoneServiceI {
    addZone: (dto: any) => Promise<ZoneI>
    getZone: (dto: any) => Promise<ZoneI>
    getAllZones: () => Promise<ZoneI[]>
    getAllSafeZones: () => Promise<ZoneI[]>
    getAllUnSafeZones: () => Promise<ZoneI[]>
    updateZoneSafety: (dto: any) => Promise<ZoneI>                  // Call in Events
    updateZoneMaintenance: (dto: any) => Promise<ZoneI>             // Call in Events
}

declare interface ZoneControllerI {
    addZone: (request: Request, response: Response, next: NextFunction) => Promise<void>
    getZone: (request: Request, response: Response, next: NextFunction) => Promise<void>
    getAllZones: (request: Request, response: Response, next: NextFunction) => Promise<void>
    getAllSafeZones: (request: Request, response: Response, next: NextFunction) => Promise<void>
    getAllUnsafeZones: (request: Request, response: Response, next: NextFunction) => Promise<void>
}