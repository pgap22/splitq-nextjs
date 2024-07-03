"use server"

import { auth } from "@/auth"
import prismaDev from "@/db/prismaDev"
function groupBy(array, key) {
    return array.reduce((result, currentValue) => {
        (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
        return result;
    }, {});
}

export async function getTotalSellerTickets() {
    const user = await auth();

    const id_user = user.user.id;

    const tickets = await prismaDev.cartUserProducts.findMany({
        include: {
            product: {
                where: {
                    seller_id: id_user
                }
            },
            combo: {
                where: {
                    id_seller: id_user
                }
            }
        },
        where: {
            ticket_enabled: true,
            OR: [
                {
                    product: {
                        isNot: null
                    },
                },
                {

                    combo: {
                        isNot: null
                    }
                }
            ]
        }
    })
    // Agrupar por id_product
    const groupedByIdProduct = groupBy(tickets, 'id_product');
    console.log('Agrupado por id_product:');
    console.log(groupedByIdProduct);

    const totaltickets = tickets.reduce((total, ticket) => { return ticket.quantity + total }, 0)
    return totaltickets
}