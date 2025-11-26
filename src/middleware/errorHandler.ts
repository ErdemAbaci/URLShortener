import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);

    res.status(500).json({
        message: 'Server Error',
        error: process.env.NODE_ENV === 'production' ? null : err.message,
    });
};

export default errorHandler;
