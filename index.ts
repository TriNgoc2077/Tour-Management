import express, { Express, Request, Response } from "express";
import dotenv from 'dotenv';
import sequelize from "./config/database";
import Tour from "./model/tour.model";
sequelize;
dotenv.config();
const app: Express = express();
const port: string | number = process.env.PORT || 3001;

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/tours', async (req: Request, res: Response) => {
    const tours = await Tour.findAll({
        raw: true
    });
    console.log(tours);
    res.render('client/pages/tours/index', {
        tours: tours
    });
});

app.listen(port, () => {
    console.log('App listening on port', port);
});