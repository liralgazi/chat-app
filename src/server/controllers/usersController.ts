import { Request, Response, NextFunction } from 'express';

export const register = (req: Request, res: Response, next: NextFunction): void => {
    console.log(req.body);
};


/*
The controller acts as an intermediary between the model and the view. It handles incoming requests from the client (such as HTTP requests) and decides how to process them.
In the context of a user controller, it receives requests related to user actions (e.g., registering a new user, logging in, updating profile information) and delegates the appropriate actions to the model.
It contains methods or functions corresponding to different endpoints or routes that clients can access to perform user-related operations.
Example controller methods might include handling user registration, authentication, profile updates, and account deletion.
 */