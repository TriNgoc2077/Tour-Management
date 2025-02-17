import { Request, Response } from "express";
import Tour from "../../models/tour.model";
interface ITour {
    id: number;
    title: string;
    code?: string;
    images?: string;
    image: string;
    price?: number;
    discount?: number;
    price_special?: number | string;
    information?: string;
    schedule?: string;
    timeStart?: Date;
    stock?: number;
    status?: string;
    position?: number;
    slug: string;
    deleted?: boolean;
    deletedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
export const index = async (req: Request, res: Response) => { 
  // SELECT * FROM tours WHERE deleted = false;
  const tours = await Tour.findAll({
    where: {
      deleted: false,
    },
    raw: true
  }) as unknown as ITour[];
  tours.forEach(item => {
    if(item["images"]) {
      const images = JSON.parse(item["images"]);
      item["image"] = images[0];
    }
    item["price_special"] = ((item["price"] || 0) * (1 - (item["discount"] || 0) / 100));
  });
  console.log(tours);
  
  res.render("admin/pages/tours/index", {
    pageTitle: "Danh sách tour",
    tours: tours
  });
};