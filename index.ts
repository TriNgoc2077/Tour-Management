import express, { Express } from "express";
import dotenv from 'dotenv';
import clientRouters from "./routers/client/index.router";

dotenv.config();
const app: Express = express();
const port: string | number = process.env.PORT || 3001;

app.set('views', './views');
app.set('view engine', 'pug');

clientRouters(app);

app.listen(port, () => {
    console.log('App listening on port', port);
});