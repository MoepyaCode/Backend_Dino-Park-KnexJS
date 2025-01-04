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
    addDino: (dto: Omit<DinoI, 'location' | 'last_fed'>) => Promise<DinoI | undefined>
    getDinoById: (id: number) => Promise<DinoI | undefined>
    getAllDinos: () => Promise<DinoI[]>
    getNullFedDinos: () => Promise<DinoI[]>
    getFedDinos: () => Promise<DinoI[]>
    getFeedDinosDue: () => Promise<DinoI[]>                     // Has 2 hours left of Digesting
    updateDinoLocation: (id: number, location: string) => Promise<DinoI | undefined>
    updateDinoLastFed: (id: number, last_fed: string) => Promise<DinoI | undefined>
    removeDino: (id: number) => Promise<number>
}

declare interface DinoServiceI {
    addDino: (dto: DinoI) => Promise<DinoI | undefined>
    getDinoById: (dto) => Promise<DinoI | undefined>
    getAllDinos: () => Promise<DinoI[]>
    getNullFedDinos: () => Promise<DinoI[]>
    getFedDinos: () => Promise<DinoI[]>
    getFeedDinosDue: () => Promise<DinoI[]>
    // updateDinoLocation: (dto: any) => Promise<DinoI | undefined>            // Call in Events
    // updateDinoLastFed: (dto: any) => Promise<DinoI | undefined>             // Call in Events
    // removeDino: (dto: any) => Promise<number>                   // Call in Events
}

declare interface DinoControllerI {
    getDinoById: (request: Request, response: Response, next: NextFunction) => Promise<void>
    getAllDinos: (request: Request, response: Response, next: NextFunction) => Promise<void>
    getNullFedDinos: (request: Request, response: Response, next: NextFunction) => Promise<void>
    getFedDinos: (request: Request, response: Response, next: NextFunction) => Promise<void>
    getFeedDinosDue: (request: Request, response: Response, next: NextFunction) => Promise<void>
}