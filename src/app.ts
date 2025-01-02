import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

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

/**
 * ERROR HANDLING
 */

export default app