import _ from "lodash"
import { dinosDao } from "../dao"
import { DinoI, DinoServiceI } from "../models"

class DinoService implements DinoServiceI {

        addDino = async (dto: DinoI): Promise<DinoI | undefined> => {
                const { last_fed, location, ...rest } = dto
                const dino = await dinosDao.getDinoById(rest.id)

                if (!_.isUndefined(dino)) throw new Error(`Dino with ID '${rest.id}' already exists!`)

                return dinosDao.addDino(rest)
        }

        getDinoById = async (dto: any): Promise<DinoI | undefined> => {
                const { id } = dto

                return this.dinoExistCheck(id)
        }

        getAllDinos = async (): Promise<DinoI[]> => {
                return dinosDao.getAllDinos()
        }

        getNullFedDinos = async (): Promise<DinoI[]> => {
                return dinosDao.getNullFedDinos()
        }

        getFedDinos = async (): Promise<DinoI[]> => {
                return dinosDao.getFedDinos()
        }

        getFeedDinosDue = async (): Promise<DinoI[]> => {
                return dinosDao.getFeedDinosDue()
        }


        /**
         * Checks if ID is a valid type
         * @param id 
         * @returns {number}
         */
        private idValidCheck(id: string): number {
                try {
                        const floatValue = parseFloat(id)

                        if (!_.isInteger(floatValue)) throw new Error()

                        return Math.floor(floatValue)
                } catch (error) {
                        throw new Error('Invalid ID type used!')
                }
        }

        /**
         * Checks if Dino exists
         * @param id 
         * @returns {DinoI}
         */
        private dinoExistCheck = async (id: string): Promise<DinoI> => {
                const validId = this.idValidCheck(id)
                const dino = await dinosDao.getDinoById(validId)

                if (_.isUndefined(dino)) throw new Error(`Dino with ID '${id}' does not exist!`)

                return dino
        }

}

export default new DinoService()