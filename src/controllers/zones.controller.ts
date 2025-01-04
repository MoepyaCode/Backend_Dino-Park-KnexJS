import { Request, Response, NextFunction } from "express";
import { ZoneControllerI } from "../models";
import { zonesService } from "../services";

class ZoneController implements ZoneControllerI {

    getZoneById = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            const { params } = request
            const zone = await zonesService.getZoneById(params)

            response.json(zone)
        } catch (error) {
            next(error)
        }
    }

    getAllZones = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            const zones = await zonesService.getAllZones()

            response.json(zones)
        } catch (error) {
            next(error)
        }
    }

    getAllSafeZones = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            const zones = await zonesService.getAllSafeZones()

            response.json(zones)
        } catch (error) {
            next(error)
        }
    }

    getAllUnsafeZones = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            const zones = await zonesService.getAllUnSafeZones()

            response.json(zones)
        } catch (error) {
            next(error)
        }
    }

}

export default new ZoneController()