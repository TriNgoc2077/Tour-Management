import { Request, Response } from "express"
import Category from "../../models/category.model"
//[GET] /categories
export const index = async (req: Request, res: Response) => {
    const categories = await Category.findAll({
        where: {
            deleted: false,
            status: 'active'
        },
        raw: true
    });
    
    res.render('client/pages/categories/index', {
        pageTitle: 'Tour categories',
        categories: categories
    })
}