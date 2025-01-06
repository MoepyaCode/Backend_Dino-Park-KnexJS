import { Request, Response, NextFunction } from "express";
import {
    DinoAddedEvent,
    DinoFedEvent,
    DinoLocationUpdatedEvent,
    DinoRemovedEvent,
    EventControllerI,
    MaintenancePerformedEvent
} from "../models";
import { eventsService } from "../services";


class EventController implements EventControllerI {

    dinoAdded = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            const { body } = request
            const eventResponse = await eventsService.dinoAdded(body as DinoAddedEvent)

            response.json(eventResponse)
        } catch (error) {
            next(error)
        }
    }

    dinoLocationUpdated = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = request.params
            const { location } = request.body
            const dto = { dinosaur_id: parseInt(id), location } as DinoLocationUpdatedEvent
            const eventResponse = await eventsService.dinoLocationUpdated(dto)

            response.json(eventResponse)
        } catch (error) {
            next(error)
        }
    }

    dinoFedUpdated = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = request.params
            const eventResponse = await eventsService.dinoFedUpdated({ dinosaur_id: parseInt(id) } as DinoFedEvent)

            response.json(eventResponse)
        } catch (error) {
            next(error)
        }
    }

    dinoRemoved = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = request.params
            const eventResponse = await eventsService.dinoRemoved({ dinosaur_id: parseInt(id) } as DinoRemovedEvent)

            response.json(eventResponse)
        } catch (error) {
            next(error)
        }
    }

    maintenancePerformed = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = request.params
            const eventResponse = await eventsService.maintenancePerformed({ location: id } as MaintenancePerformedEvent)

            response.json(eventResponse)
        } catch (error) {
            next(error)
        }
    }

    sync = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            const eventResponse = await eventsService.sync()

            response.json(eventResponse)
        } catch (error) {
            next(error)
        }
    }

    /**
     * Controller Reviews safety of all zones
     */

}

export default new EventController()