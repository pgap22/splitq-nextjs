"use server"
import prisma from "@/db/prisma";
import { authUser } from "@/lib/authUser";

export async function getUserCart() {

    const {id} = await authUser();

    const items = await prisma.cartUserProducts.findMany({
        where: {
           AND: [
            { id_user: id},
            {ticket_enabled: false}
           ]
        },
        include: {
            product:{
            	include:{
            		images: true,
                    seller: true
            	}
            },
            combo:{
                include: {
                    seller: true
                }
            }
        },
        orderBy: {
            id: 'asc'
        }
    });

    return items.map(item=> {
        if(item.combo){
            item.product = {...item.combo}
            delete item.combo
            return item
        }
        return item
    })
}