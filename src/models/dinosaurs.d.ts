import { NextFunction, Request, Response } from "express"

/* Models Dino (Managed by Events) */

declare interface DinoI {
    id: number
    name: string
    species: string
    gender: 'male' | 'female'
    digestion_period_in_hours: number
    herbivore: boolean
    park_id: number
    location: string | null
    last_fed: string | null
}

declare interface DinoDaoI {
    addDino: (dino: DinoI) => Promise<DinoI>
    getDinoById: (id: number) => Promise<DinoI | undefined>
    getDinosByLocation: (location: string) => Promise<DinoI[]>
    getAllDinos: () => Promise<DinoI[]>
    updateDinoLocation: (id: number, location: string) => Promise<DinoI>
    updateDinoLastFed: (id: number, last_fed: string) => Promise<DinoI>
    removeDino: (id: number) => Promise<number>
}

declare interface DinoServiceI {
    addDino: (dino: DinoI) => Promise<DinoI>
    getDinoById: (id: number) => Promise<DinoI>
    getDinosByLocation: (location: string) => Promise<DinoI[]>
    getAllDinos: () => Promise<DinoI[]>
    getFeedDinosDue: () => Promise<DinoI[]>
    updateDinoLocation: (id: number, location: string) => Promise<DinoI>            // Call in Events
    updateDinoLastFed: (id: number) => Promise<DinoI>             // Call in Events
    removeDino: (id: number) => Promise<DinoI>                   // Call in Events
}

declare interface DinoControllerI {
    getDinoById: (request: Request, response: Response, next: NextFunction) => Promise<void>
    getAllDinos: (request: Request, response: Response, next: NextFunction) => Promise<void>
    getFeedDinosDue: (request: Request, response: Response, next: NextFunction) => Promise<void>
}