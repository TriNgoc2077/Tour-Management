import { Request, Response } from "express";
import Tour from "../../model/tour.model";
import sequelize from "../../config/database";
import { QueryTypes } from "sequelize";
interface ITour {
    id: number;
    title: string;
    code?: string;
    images?: string;
    image: string;
    price?: number;
    discount?: number;
    price_special: number | string;
    information?: string;
    schedule?: string;
    timeStart?: Date;
    stock?: number;
    status?: string;
    position?: number;
    slug: number;
    deleted?: boolean;
    deletedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
//[GET] /tours/:slugCategory
export const index = async (req: Request, res: Response) => {
    const slug = req.params.slugCategory;
    
    const tours = await sequelize.query(`
        SELECT tours.*, ROUND(price * (1 - discount/100), 0) AS price_special
        FROM tours
        JOIN tours_categories ON tours.id = tours_categories.tour_id
        JOIN categories ON tours_categories.category_id = categories.id
        WHERE
            categories.slug = '${slug}'
            AND categories.deleted = false
            AND categories.status = 'active'
            AND tours.deleted = false
            AND tours.status = 'active'
    `, {
        type: QueryTypes.SELECT
    }) as ITour[];

    tours.forEach(item => {
        if (item.images) {
            const images = JSON.parse(item.images);
            item.image = images[0];
        }
        item.price_special = parseFloat(item.price_special as string);
    });
    res.render('client/pages/tours/index', {
        pageTitle: 'List tours',
        tours: tours
    });
}