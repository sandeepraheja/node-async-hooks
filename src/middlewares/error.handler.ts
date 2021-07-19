import { Request, Response, NextFunction } from 'express'
import ErrorResponse from '../lib/ErrorResponse'

export class ErrorHandler {
    public static errorHandler(err:ErrorResponse, req: Request, resp: Response) {
        resp.status(err.status || 500).json({
            success: false,
            error: err.message || `Internal Server Error`
        })
    }
}