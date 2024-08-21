"use server"

import { auth } from "@/auth";
import prisma from "@/db/prisma";

export async function getSalesByProductAndCombo() {
    const user = await auth();
    const id_user = user.user.id;

    // Obtener tickets con detalles de productos y combos
    const tickets = await prisma.cartUserProducts.findMany({
        include: {
            product: {
                select: {
                    id: true,
                    name: true,
                    price: true,
                },
                where: {
                    seller_id: id_user
                }
            },
            combo: {
                select: {
                    id: true,
                    name: true,
                    price: true,
                },
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
    });

    // Calcular las ventas totales por producto
    const productSales = {};
    // Calcular las ventas totales por combo
    const comboSales = {};

    tickets.forEach(ticket => {
        if (ticket.product) {
            const productName = ticket.product.name;
            if (!productSales[productName]) {
                productSales[productName] = 0;
            }
            productSales[productName] += ticket.quantity;
        }

        if (ticket.combo) {
            const comboName = ticket.combo.name;
            if (!comboSales[comboName]) {
                comboSales[comboName] = 0;
            }
            comboSales[comboName] += ticket.quantity;
        }
    });

    return { productSales, comboSales };
}
