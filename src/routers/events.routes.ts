import { Router } from "express";
import { eventsController } from "../controllers";

const router = Router()

/**
 * POST: Add Dino
 */
router.post('/dinos', eventsController.dinoAdded)

/**
 * PATCH: Dino Location Update
 */
router.patch('/dinos/location_update/id/:id', eventsController.dinoLocationUpdated)

/**
 * PATCH: Dino Fed Update
 */
router.patch('/dinos/feed_update/id/:id', eventsController.dinoFedUpdated)

/**
 * DELETE: Remove Dino
 */
router.delete('/dinos/delete/id/:id', eventsController.dinoRemoved)

/**
 * PATCH: Zone maintenance performed
 */
router.patch('/zones/maintenance/id/:id', eventsController.maintenancePerformed)

/**
 * POST: Syncing the Feed to DB
 */
router.post('/sync', eventsController.sync)

export { router as EventsRoutes }