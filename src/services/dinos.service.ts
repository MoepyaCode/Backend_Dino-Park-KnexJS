import _, { isNull, isUndefined, keys } from "lodash"
import { dinosDao } from "../dao"
import { DinoI, DinoServiceI } from "../models"

export enum DinoExistErrors {
        Exists,
        NotExist
}

class DinoService implements DinoServiceI {

        addDino = async (dino: DinoI): Promise<DinoI> => {
                const { exists } = await this.dinoExistCheck(dino.id)

                if (exists) throw new Error(this.errorStrings(DinoExistErrors.Exists, dino.id))

                const { location, last_fed, ...keys } = this.getDinoKeys()

                for (const key of Object.keys(keys) as Array<keyof Omit<DinoI, 'location' | 'last_fed'>>) {
                        const value = dino[key]

                        if (isUndefined(value)) throw new Error(`Key and value of '${key}' are missing!`)
                }

                const dto: DinoI = {
                        ...dino,
                        location: dino.location ? dino.location : null,
                        last_fed: dino.last_fed ? dino.last_fed : null
                }

                return dinosDao.addDino(dto)
        }

        getDinoById = async (id: number): Promise<DinoI> => {
                const { dino } = await this.dinoExistCheck(id)

                if (!dino) throw new Error(this.errorStrings(DinoExistErrors.NotExist, id))

                return dino
        }

        getDinosByLocation = async (location: string): Promise<DinoI[]> => {
                return dinosDao.getDinosByLocation(location)
        }

        getAllDinos = async (): Promise<DinoI[]> => {
                return dinosDao.getAllDinos()
        }

        getFeedDinosDue = async (): Promise<DinoI[]> => {
                const dinos = await this.getAllDinos()

                return dinos.filter(dino => {
                        const { last_fed, digestion_period_in_hours } = dino

                        if (isNull(last_fed)) return true

                        const digestionTimeRemaining = this.getDigestTimeRemaining(last_fed, digestion_period_in_hours)

                        if (digestionTimeRemaining <= 2) return true

                        return false

                })
        }

        updateDinoLocation = async (id: number, location: string): Promise<DinoI> => {
                await this.getDinoById(id)

                return dinosDao.updateDinoLocation(id, location)
        }

        updateDinoLastFed = async (id: number): Promise<DinoI> => {
                await this.getDinoById(id)

                const date = new Date().toISOString()

                await dinosDao.updateDinoLastFed(id, date)

                return this.getDinoById(id)
        }

        removeDino = async (id: number): Promise<DinoI> => {
                const dino = await this.getDinoById(id)

                await dinosDao.removeDino(id)

                return dino
        }

        /**
         * IMPORTANT
         * 1. Reviews zone safety on Dino update
         * @param location 
         * @returns { boolean } boolean of whether a zone is safe after Dinos update
         */
        reviewZoneSafety = async (location: string): Promise<boolean> => {
                const dinos = await dinosDao.getDinosByLocation(location)

                return this.isSafeBoolean(dinos)
        }

        /**
         * Determines if a Zone is safe based on Dinos in the Zones
         * @param dinos 
         * @returns { boolean }
         */
        private isSafeBoolean = (dinos: DinoI[]): boolean => {
                let is_safe

                for (const dino of dinos) {
                        if (!dino.herbivore) {
                                is_safe = this.carnivoreSafetyReview(dino)
                        }

                        if (is_safe === false) return false
                }

                return true
        }

        /**
         * 1. last_fed should not be NULL
         * 2. remaining digestion time should not be 2hrs or less
         * @param dino 
         * @returns {boolean} boolean of whether a zone is safe
         */
        private carnivoreSafetyReview(dino: DinoI): boolean {
                const { last_fed, digestion_period_in_hours } = dino

                if (_.isNull(last_fed)) return false

                const digestionTimeRemaining = this.getDigestTimeRemaining(last_fed, digestion_period_in_hours)

                if (digestionTimeRemaining <= 2) {
                        return false
                }

                return true
        }

        /**
         * @param last_fed 
         * @param digestion_period_in_hours 
         * @returns { number } remaining digestion time in hours
         */
        private getDigestTimeRemaining = (last_fed: string, digestion_period_in_hours: number): number => {
                const dateLastFed = new Date(last_fed)
                const currentDate = new Date()
                const diffInMill = currentDate.getTime() - dateLastFed.getTime()
                const diffInHours = diffInMill / (1000 * 60 * 60)

                return digestion_period_in_hours - diffInHours
        }

        /**
         * Checks if ID is a valid type
         * @param id 
         * @returns {number}
         */
        private idValidCheck(id: number): number {
                try {
                        if (!_.isInteger(id)) throw new Error()

                        return Math.floor(id)
                } catch (error) {
                        throw new Error('Invalid ID type used!')
                }
        }

        /**
         * Checks if Dino exists
         * @param id 
         * @returns {DinoI} Dino object
         */
        private dinoExistCheck = async (id: number): Promise<{ dino: DinoI | undefined, exists: boolean }> => {
                const validId = this.idValidCheck(id)
                const dino = await dinosDao.getDinoById(validId)

                if (_.isUndefined(dino)) return { dino, exists: false }

                return { dino, exists: true }
        }

        /**
         * Provides errors based on a specific request
         * @param error 
         * @param id 
         * @returns { string } error message
         */
        private errorStrings = (error: DinoExistErrors, id: number): string => {
                switch (error) {
                        case DinoExistErrors.Exists:
                                return `Dino with ID '${id}' already exists!`
                        case DinoExistErrors.NotExist:
                                return `Dino with ID '${id}' does not exist!`
                        default:
                                throw new Error('Incorrect error message request!')
                }
        }

        private getDinoKeys = (): DinoI => ({
                id: 0,
                name: '',
                species: '',
                gender: 'male',
                herbivore: true,
                digestion_period_in_hours: 0,
                park_id: 1,
                location: null,
                last_fed: null
        })
}

export default new DinoService()