import express, { Express, Request, Response } from "express";
import dotenv from 'dotenv';
dotenv.config();
const app: Express = express();
const port: string | number = process.env.PORT || 3001;

app.get('/', (req: Request, res: Response) => {
    res.send('okk');
});

app.listen(port, () => {
    console.log('App listening on port ', port);
});