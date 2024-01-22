import { NextResponse } from 'next/server';
import { NextApiRequest, NextApiResponse, } from "next";
import {failureResponse, successResponse} from './response';

class CustomError extends Error {
    statusCode: number;

    constructor(name: string, message: string, statusCode?: number) {
        super(message);
        this.name = name;
        this.statusCode = statusCode || 500;
        Error.captureStackTrace(this, this.constructor);
    }
}

function createCustomError(name: string, statusCode: number = 500) {
    return class extends CustomError {
        constructor(message: string) {
            super(name, message, statusCode);
        }
    };
}

const NotFoundError = createCustomError("NotFound Error", 404);
const BadRequestError = createCustomError("BadRequest Error", 400);
const UnauthorizedError = createCustomError("Unauthorized Error", 401);
const ForbiddenError = createCustomError("Forbidden Error", 403);
const InternalServerError = createCustomError("Internal ServerError", 500);
const MethodNotAllowedError = createCustomError("MethodNotAllowed Error", 405);
const ConflictError = createCustomError("Conflict Error", 409);
const UnprocessableEntityError = createCustomError(
    "Unprocessable Entity Error",
    422
);


export {
    CustomError,
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    InternalServerError,
    MethodNotAllowedError,
    UnprocessableEntityError,
    ConflictError,
};