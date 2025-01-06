/* Manages events that affect Dino and Zones */

import { NextFunction, Request, Response } from "express"
import { DinoI } from "./dinosaurs"
import { ZoneI } from "./zones"

declare enum EventTypes {
    MAINTENANCE_PERFORMED = 'maintenance_performed',
    DINO_ADDED = 'dino_added',
    DINO_LOCATION_UPDATED = 'dino_location_updated',
    DINO_FED = 'dino_fed',
    DINO_REMOVED = 'dino_removed',
}

type DinoBaseEvent = {
    kind: EventTypes
    dinosaur_id: number
    time: string
    location?: string
}

declare type MaintenancePerformedEvent = {
    kind: EventTypes
    location: string
    park_id: number
    time: string
}

declare type DinoAddedEvent = Omit<DinoBaseEvent, 'dinosaur_id'> & Omit<DinoI, | 'time' | 'last_fed' | 'location'>

declare type DinoLocationUpdatedEvent = DinoBaseEvent

declare type DinoFedEvent = DinoBaseEvent

declare type DinoRemovedEvent = DinoBaseEvent

declare type EventFeedTypes = DinoAddedEvent | DinoLocationUpdatedEvent | DinoFedEvent | DinoRemovedEvent | MaintenancePerformedEvent

declare type EventReturn = {
    dino: DinoI
    zone?: ZoneI
    prevZone?: ZoneI
}

interface EventServiceI {
    dinoAdded: (event: DinoAddedEvent) => Promise<EventReturn>
    dinoLocationUpdated: (event: DinoLocationUpdatedEvent) => Promise<EventReturn>
    dinoFedUpdated: (event: DinoFedEvent) => Promise<EventReturn>
    dinoRemoved: (event: DinoRemovedEvent) => Promise<EventReturn>
    maintenancePerformed: (event: MaintenancePerformedEvent) => Promise<ZoneI>
    sync: () => Promise<boolean>
}

interface EventControllerI {
    dinoAdded: (request: Request, response: Response, next: NextFunction) => Promise<void>
    dinoLocationUpdated: (request: Request, response: Response, next: NextFunction) => Promise<void>
    dinoFedUpdated: (request: Request, response: Response, next: NextFunction) => Promise<void>
    dinoRemoved: (request: Request, response: Response, next: NextFunction) => Promise<void>
    maintenancePerformed: (request: Request, response: Response, next: NextFunction) => Promise<void>
    sync: (request: Request, response: Response, next: NextFunction) => Promise<void>
}