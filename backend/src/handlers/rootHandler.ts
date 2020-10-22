import { Request, Response } from "express";

interface StringResponse {
    message: string
}

type StringBuilder = (message: string) => StringResponse;

const stringBuilder: StringBuilder = message => ({ message })

const rootHandler = (_req: Request, res: Response) => {
    return res.send("Backend API is working 🤓")
}

export const defaultHandler = (req: Request, res: Response) => {
    const { params } = req;
    const { message = 'Working' } = params;
    const response = stringBuilder(message);
    return res.send(response);
}

export default rootHandler;
