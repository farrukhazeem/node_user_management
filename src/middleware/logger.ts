import { Request, Response, NextFunction } from 'express';
import moment from 'moment';

export async function logger (req:Request, res:Response, next:NextFunction) { 
    const logTime = moment();
    console.log(`API LOG at ${logTime} - status code[${res.statusCode}] - method [${req.method}] - url [${req.url}] - path [${req.ip}]`); 
        next(); 
    }; 