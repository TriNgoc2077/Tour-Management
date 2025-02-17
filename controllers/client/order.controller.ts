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
    slug: number;
    deleted?: boolean;
    deletedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
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