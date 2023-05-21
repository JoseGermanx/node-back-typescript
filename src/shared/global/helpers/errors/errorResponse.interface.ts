import HTTP_STATUS from 'http-status-codes';
import { IError } from './error.interface';

export interface IErrorResponse {
    status: string;
    statusCode: number;
    message: string;
    serializeError(): IError;
}