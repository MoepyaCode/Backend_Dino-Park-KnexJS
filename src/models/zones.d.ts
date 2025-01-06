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
    addZone: (id: string) => Promise<ZoneI>
    getZoneById: (id: string) => Promise<ZoneI | undefined>
    getAllZones: () => Promise<ZoneI[]>
    getAllSafeZones: () => Promise<ZoneI[]>
    getAllUnSafeZones: () => Promise<ZoneI[]>
    updateZoneSafety: (id: string, is_safe: boolean) => Promise<ZoneI>
    updateZoneMaintenance: (id: string, last_maintained: string) => Promise<ZoneI>
}

declare interface ZoneServiceI {
    addZone: (id: string) => Promise<ZoneI | undefined>
    init: () => Promise<void>
    getZoneById: (id: string) => Promise<ZoneI>
    getAllZones: () => Promise<ZoneI[]>
    getAllSafeZones: () => Promise<ZoneI[]>
    getAllUnSafeZones: () => Promise<ZoneI[]>
    getMaintenanceDueZones: () => Promise<ZoneI[]>                  
    updateZoneSafety: (id: string, is_safe: boolean) => Promise<ZoneI>                  // Call in Events
    updateZoneMaintenance: (id: string) => Promise<ZoneI>             // Call in Events
}

declare interface ZoneControllerI {
    getZoneById: (request: Request, response: Response, next: NextFunction) => Promise<void>
    getAllZones: (request: Request, response: Response, next: NextFunction) => Promise<void>
    getAllSafeZones: (request: Request, response: Response, next: NextFunction) => Promise<void>
    getAllUnsafeZones: (request: Request, response: Response, next: NextFunction) => Promise<void>
    getMaintenanceDueZones: (request: Request, response: Response, next: NextFunction) => Promise<void>
}