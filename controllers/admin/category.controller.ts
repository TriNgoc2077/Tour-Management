import { Request, Response } from "express";
import Category from "../../models/category.model";
export const index = async (req: Request, res: Response) => { 
  // SELECT * FROM categories WHERE deleted = false;
  const categories = await Category.findAll({
    where: {
      deleted: false,
    },
    raw: true
  });
  console.log(categories);
  
  res.render("admin/pages/categories/index", {
    pageTitle: "Danh mục tour",
    categories: categories
  });
};