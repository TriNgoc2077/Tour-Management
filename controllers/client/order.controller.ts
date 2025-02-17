import { Request, Response } from "express";
import Order from "../../model/order.model";
import { generateOrderCode } from "../../helpers/generate.helper";
import Tour from "../../model/tour.model";
import OrderItem from "../../model/order-item.model";
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
interface IOrder {
    id: number;
    code: string;
    fullName: string;
    phone: string;
    note?: string;
    status?: string;
    total_price?: number;
    deleted?: boolean;
    deletedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
interface IOrderItem {
    id: number;
    orderId: number;
    tourId: number;
    title?: string;
    slug?: string;
    image?: string;
    quantity?: number;
    price_special?: number;
    price?: number;
    total: number;
    discount?: number;
    timeStart: Date;
}
export const index = async (req: Request, res: Response) => {
    const info = req.body.info;
    const cart = req.body.cart;

    const dataOrder = {
        code: '',
        fullName: info.fullName,
        phone: info.phone,
        note: info.note,
        status: 'initial'
    };
    const order = await Order.create(dataOrder);
    const orderId = order.dataValues.id;

    const code = generateOrderCode(orderId);
    await Order.update({
        code: code 
    }, {
        where: {
            id: orderId
        }
    });

    for (const item of cart) {
        const dataItem = {
            orderId: orderId,
            tourId: item.tourId,
            quantity: item.quantity
        } as any;
        const tourInfo = await Tour.findOne({
            where: {
                id: item.tourId,
                deleted: false,
                status: 'active'
            },
            raw: true
        }) as unknown as ITour;
        
        dataItem.price = tourInfo.price;
        dataItem.discount = tourInfo.discount;
        dataItem.timeStart = tourInfo.timeStart;
        await OrderItem.create(dataItem);
    }

    res.json({
        code: 'success',
        message: 'Order successfully !',
        orderCode: code
    });
};

export const success = async (req: Request, res: Response) => {
    const orderCode = req.query.orderCode;
  
    const order = await Order.findOne({
      where: {
        code: orderCode,
        deleted: false,
      },
      raw: true,
    }) as unknown as IOrder;
  
    const ordersItem = await OrderItem.findAll({
      where: {
        orderId: order.id,
      },
      raw: true,
    }) as unknown as IOrderItem[];
  
    for (const item of ordersItem) {
      item.price_special = (item.price || 0 * (1 - (item.discount || 0)/ 100));
      item.total = item.price_special * (item.quantity || 0);
  
      const tourInfo = await Tour.findOne({
        where: {
          id: item["tourId"],
        },
        raw: true,
      }) as unknown as ITour;
  
      const images = JSON.parse(tourInfo.images || '');
      item.image = images[0];
      item.title = tourInfo.title;
      item.slug = tourInfo.slug;
    }
  
    order.total_price = ordersItem.reduce((sum, item) => sum + item["total"], 0);
  
    res.render("client/pages/order/success", {
      pageTitle: "Đặt hàng thành công",
      order: order,
      ordersItem: ordersItem
    });
  };