import { NextFunction, Request, Response } from "express";

export function GlobalErrorHandler(error: any, request: Request, response: Response, next: NextFunction) {
    response.status(error.statusCode || 500).json({ message: error.message })
}