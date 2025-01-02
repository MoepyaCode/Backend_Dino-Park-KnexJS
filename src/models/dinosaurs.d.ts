/* Models Dino (Managed by Events) */

declare interface DinoI {
    id: number
    name: string
    species: string
    gender: 'male' | 'female'
    digestion_period_in_hours: number
    herbivore: boolean
    park_id: number
    location: string
    last_fed: string
}

declare interface DinoDaoI {
    addDino: (dto: DinoI) => Promise<DinoI>
    getDino: (id: number) => Promise<DinoI>
    getAllDinos: (id: number) => Promise<DinoI[]>
    getNoneFedDinos: () => Promise<DinoI[]>
    getFedDinos: () => Promise<DinoI[]>
    getFeedDinosDue: () => Promise<DinoI[]>                     // Has 2 hours left of Digesting
    updateDinoLocation: (location: string) => Promise<DinoI>
    updateDinoLastFed: (time: string) => Promise<DinoI>
    removeDino: (id: number) => Promise<number>
}

declare interface DinoService {
    addDino: (dto: DinoI) => Promise<DinoI>
    getDino: (dto) => Promise<DinoI>
    getAllDinos: (dto: any) => Promise<DinoI[]>
    getNoneFedDinos: () => Promise<DinoI[]>
    getFedDinos: () => Promise<DinoI[]>
    getFeedDinosDue: () => Promise<DinoI[]>
    updateDinoLocation: (dto: any) => Promise<DinoI>            // Call in Events
    updateDinoLastFed: (dto: any) => Promise<DinoI>             // Call in Events
    removeDino: (dto: any) => Promise<number>                   // Call in Events
}

declare interface DinoController {
    getDino: (dto) => Promise<DinoI>
    getAllDinos: (dto: any) => Promise<DinoI[]>
    getNoneFedDinos: () => Promise<DinoI[]>
    getFedDinos: () => Promise<DinoI[]>
    getFeedDinosDue: () => Promise<DinoI[]>
}