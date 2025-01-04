import { NextFunction, Request, Response } from "express";

export function GlobalErrorHandler(error: any, request: Request, response: Response, next: NextFunction) {
    response.status(error.statusCode || 500).json(error.message)
}

class AppError extends Error {
    statusCode: number

    constructor(message: string, statusCode: number){
        super(message)
        this.statusCode = statusCode
        Error.captureStackTrace(this, this.constructor)
    }
}

export default AppError