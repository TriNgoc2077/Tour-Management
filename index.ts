import express, { Express } from "express";
import dotenv from 'dotenv';
import clientRouters from "./routers/client/index.router";
import moment from 'moment';
import cors from 'cors';
dotenv.config();
const app: Express = express();
const port: string | number = process.env.PORT || 3001;

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');
app.use(cors({credentials: true}));
//App local variables
app.locals.moment = moment;

app.use(express.static(`${__dirname}/public`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

clientRouters(app);

app.listen(port, () => {
    console.log('App listening on port', port);
});