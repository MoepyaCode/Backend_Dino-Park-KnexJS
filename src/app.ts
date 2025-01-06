import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { DinosRoutes, EventsRoutes, ZonesRoutes } from './routers'
import { GlobalErrorHandler } from './errors'

const app = express()

/**
 * MIDDLEWARES
 */
app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())

/**
 * ROUTERS
 */
app.use('/zones', ZonesRoutes)
app.use('/dinos', DinosRoutes)
app.use('/events', EventsRoutes)

/**
 * ERROR HANDLING
 */
app.use(GlobalErrorHandler)

export default app