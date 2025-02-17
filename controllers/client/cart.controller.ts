import { Request, Response } from "express"
import Tour from "../../model/tour.model";
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
    slug: number;
    deleted?: boolean;
    deletedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
export const index = async (req: Request, res: Response) => {
    res.render('client/pages/cart/index', {
        pageTitle: 'Cart'
    })
}

export const list = async (req: Request, res: Response) => {
    const tours = req.body;
  
    let total = 0;
  
    for (const tour of tours) {
      const infoTour = await Tour.findOne({
        where: {
          id: tour.tourId
        },
        raw: true
      }) as unknown as ITour;
  
      if(infoTour.images) {
        const images = JSON.parse(infoTour.images);
        tour.image = images[0];
      }
  
      tour.title = infoTour.title;
      tour.slug = infoTour.slug;
      tour.price_special = (1 - (infoTour.discount || 0)/100) * (infoTour.price || 0);
      tour.total = tour.price_special * tour.quantity;
      total += tour.total;
    }
  
    res.json({
      tours: tours,
      total: total
    });
  };