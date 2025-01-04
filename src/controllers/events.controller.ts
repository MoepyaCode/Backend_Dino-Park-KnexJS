import { Request, Response, NextFunction } from "express";
import { EventControllerI } from "../models";


class EventController implements EventControllerI {

    dinoAdded = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {

        } catch(error) {
            next(error)
        }
    }

    dinoLocationUpdated = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {

        } catch(error) {
            next(error)
        }
    }

    dinoFedUpdated = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {

        } catch(error) {
            next(error)
        }
    }

    dinoRemoved = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {

        } catch(error) {
            next(error)
        }
    }

    maintenancePerformed = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {

        } catch(error) {
            next(error)
        }
    }

    sync = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {

        } catch(error) {
            next(error)
        }
    }

}

export default new EventController()