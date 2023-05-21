import HTTP_STATUS from 'http-status-codes';

export interface IError {
    status: string;
    statusCode: number;
    message: string;
}