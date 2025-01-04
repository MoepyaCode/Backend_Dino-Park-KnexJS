import { Router } from "express";
import { zonesController } from "../controllers";

const router = Router()

/**
 * GET: Zone by ID
 */
router.get('/id/:id', zonesController.getZoneById)

/**
 * GET: All Zones
 */
router.get('/', zonesController.getAllZones)

/**
 * GET: All safe Zones
 */
router.get('/safe', zonesController.getAllSafeZones)

/**
 * GET: All unsafe Zones
 */
router.get('/unsafe', zonesController.getAllUnsafeZones)

export {router as ZonesRoutes}