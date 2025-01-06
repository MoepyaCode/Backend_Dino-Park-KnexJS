import _, { isNull, isUndefined } from "lodash";
import {
    DinoAddedEvent,
    DinoFedEvent,
    DinoI,
    DinoLocationUpdatedEvent,
    DinoRemovedEvent,
    EventFeedTypes,
    EventReturn,
    EventServiceI,
    MaintenancePerformedEvent
} from "../models";
import dinosService from "./dinos.service";
import zonesService, { ZoneExistError } from "./zones.service";
import { apiFetcher } from "../utils";

class EventService implements EventServiceI {

    dinoAdded = async (event: DinoAddedEvent): Promise<EventReturn> => {
        const { location } = event
        const { exists } = await zonesService.zoneExistCheck(location)

        if (exists === false) throw new Error(zonesService.errorStrings(ZoneExistError.NotExist, location))

        const { kind, time, ...rest } = event
        const dino = await dinosService.addDino(rest as unknown as DinoI)

        if (_.isUndefined(exists)) return { dino }

        const is_safe = await dinosService.reviewZoneSafety(location as string)
        const zone = await zonesService.updateZoneSafety(location as string, is_safe)

        return { dino, zone }
    }

    dinoLocationUpdated = async (event: DinoLocationUpdatedEvent): Promise<EventReturn> => {
        const { location, dinosaur_id } = event
        await zonesService.getZoneById(location as string)
        const prevDino = await dinosService.getDinoById(dinosaur_id)

        if (prevDino.location === location) throw new Error(`Dino is already in location ${location}!`)

        const newDino = await dinosService.updateDinoLocation(dinosaur_id, location as string)
        const newZone_is_safe = await dinosService.reviewZoneSafety(location as string)
        const newZoneUpdate = await zonesService.updateZoneSafety(location as string, newZone_is_safe)

        if (isUndefined(prevDino.location) || isNull(prevDino.location)) return { dino: newDino, zone: newZoneUpdate }

        const prevZone_is_safe = await dinosService.reviewZoneSafety(prevDino?.location as string)
        const prevZoneUpdate = await zonesService.updateZoneSafety(prevDino.location as string, prevZone_is_safe)

        return { dino: newDino, zone: newZoneUpdate, prevZone: prevZoneUpdate }
    }

    dinoFedUpdated = async (event: DinoFedEvent) => {
        const { kind, ...rest } = event
        const dino = await dinosService.updateDinoLastFed(rest.dinosaur_id)

        if (isNull(dino.location)) return { dino }

        const is_safe = await dinosService.reviewZoneSafety(dino.location)
        await zonesService.getZoneById(dino.location)
        const zone = await zonesService.updateZoneSafety(dino.location, is_safe)

        return { dino, zone }
    }

    dinoRemoved = async (event: DinoRemovedEvent) => {
        const { dinosaur_id } = event
        const dino = await dinosService.removeDino(dinosaur_id)
        const { location } = dino

        if (isNull(location)) return { dino }

        const is_safe = await dinosService.reviewZoneSafety(location)
        const zone = await zonesService.updateZoneSafety(location, is_safe)

        return { dino: dino, zone }
    }

    maintenancePerformed = async (event: MaintenancePerformedEvent) => {
        const { location } = event

        return zonesService.updateZoneMaintenance(location)
    }

    sync = async (): Promise<boolean> => {
        const eventsFeed = await apiFetcher() as EventFeedTypes[]
        const sortedFeed = this.sortedEvents(eventsFeed)

        for (const event of sortedFeed) {
            await this.eventHandler(event)
        }

        return true
    }

    private sortedEvents = (events: EventFeedTypes[]) => {
        return events.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())
    }

    private eventHandler = async (event: EventFeedTypes) => {
        const { kind } = event

        switch (kind) {
            case 'dino_added':
                return this.dinoAdded(event as DinoAddedEvent)
            case 'dino_location_updated':
                return this.dinoLocationUpdated(event as DinoLocationUpdatedEvent)
            case 'dino_fed':
                return this.dinoFedUpdated(event as DinoFedEvent)
            case 'dino_removed':
                return this.dinoRemoved(event as DinoRemovedEvent)
            case 'maintenance_performed':
                return this.maintenancePerformed(event as MaintenancePerformedEvent)
            default:
                throw new Error(`Event kind ${kind} not recognized!`)
        }
    }
}

export default new EventService()