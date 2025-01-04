import { Request, Response, NextFunction } from "express";
import { DinoControllerI } from "../models";
import { dinosService } from "../services";

class DinoController implements DinoControllerI {

    getDinoById = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            const { params } = request
            const dino = await dinosService.getDinoById(params)

            response.json(dino)
        } catch (error) {
            next(error)
        }
    }

    getAllDinos = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            const dinos = await dinosService.getAllDinos()

            response.json(dinos)
        } catch (error) {
            next(error)
        }
    }

    getNullFedDinos = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            const dinos = await dinosService.getNullFedDinos()

            response.json(dinos)
        } catch (error) {
            next(error)
        }
    }

    getFedDinos = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            const dinos = await dinosService.getFedDinos()

            response.json(dinos)
        } catch (error) {
            next(error)
        }
    }

    getFeedDinosDue = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            const dinos = await dinosService.getFeedDinosDue()

            response.json(dinos)
        } catch (error) {
            next(error)
        }
    }

}


export default new DinoController()