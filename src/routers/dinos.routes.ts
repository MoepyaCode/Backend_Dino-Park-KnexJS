import { Router } from "express";
import { dinosController } from "../controllers";

const router = Router()

/**
 * GET: Dino By ID
 */
router.get('/id/:id', dinosController.getDinoById)

/**
 * GET: All Dinos
 */
router.get('/', dinosController.getAllDinos)

/**
 * GET: All Dinos Due for Feeding
 */
router.get('/last_fed/due', dinosController.getFeedDinosDue)

export { router as DinosRoutes }