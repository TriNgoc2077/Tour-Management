import express, { Express } from "express";
import dotenv from 'dotenv';
import clientRouters from "./routers/client/index.router";
import moment from 'moment';

dotenv.config();
const app: Express = express();
const port: string | number = process.env.PORT || 3001;

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

//App local variables
app.locals.moment = moment;

app.use(express.static(`${__dirname}/public`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

clientRouters(app);

app.listen(port, () => {
    console.log('App listening on port', port);
});