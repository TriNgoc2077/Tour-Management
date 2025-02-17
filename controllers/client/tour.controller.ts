import { Request, Response } from "express";
import Tour from "../../model/tour.model";
//[GET] /tours
export const index = async (req: Request, res: Response) => {
    const tours = await Tour.findAll({
        where: {
            deleted: false,
            status: 'active'
        },
        raw: true
    });
    console.log(tours);
    res.render('client/pages/tours/index', {
        pageTitle: 'List tours',
        tours: tours
    });
}