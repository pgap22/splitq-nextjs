/*"use server"

import { auth } from "@/auth"
import prisma from "@/db/prisma"
function groupBy(array, key) {
    return array.reduce((result, currentValue) => {
        (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
        return result;
    }, {});
}

export async function getTotalSellerTickets() {
    const user = await auth();

    const id_user = user.user.id;

    const tickets = await prisma.cartUserProducts.findMany({
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

    const totaltickets = tickets.reduce((total, ticket) => { return ticket.quantity + total }, 0)
    return totaltickets
}
*/
"use server";

import { auth } from "@/auth";
import prisma from "@/db/prisma";
import prismaDev from "@/db/prismaDev";

export async function getSellerStats() {
  const user = await auth();
  const id_user = user.user.id;
  const tickets = await prismaDev.cartUserProducts.findMany({
    include: {
      product: true,
      combo: true,
    },
    where: {
      OR: [
        {
          product: {
            seller_id: id_user,
          },
        },
        {
            combo: {
                id_seller: id_user
            }
        }
      ],
    },
  });
  let totalTickets = 0;
  let totalSales = 0;
  const productSales = {};
  const comboSales = {};
  let mostSoldProduct = { name: "", quantity: 0 };
  let mostSoldCombo = { name: "", quantity: 0 };

  tickets.forEach((ticket) => {
    totalTickets += ticket.quantity;

    if (ticket.product) {
      totalSales += ticket.quantity * ticket.product.price;
      if (!productSales[ticket.product.name]) {
        productSales[ticket.product.name] = 0;
      }
      productSales[ticket.product.name] += ticket.quantity;

      if (productSales[ticket.product.name] > mostSoldProduct.quantity) {
        mostSoldProduct = {
          name: ticket.product.name,
          quantity: productSales[ticket.product.name],
        };
      }
    }

    if (ticket.combo) {
      totalSales += ticket.quantity * ticket.combo.price;
      if (!comboSales[ticket.combo.name]) {
        comboSales[ticket.combo.name] = 0;
      }
      comboSales[ticket.combo.name] += ticket.quantity;

      if (comboSales[ticket.combo.name] > mostSoldCombo.quantity) {
        mostSoldCombo = {
          name: ticket.combo.name,
          quantity: comboSales[ticket.combo.name],
        };
      }
    }
  });

  return {
    totalTickets,
    totalSales,
    mostSoldProductName: mostSoldProduct.name || "N/A",
    mostSoldComboName: mostSoldCombo.name || "N/A",
  };
}
