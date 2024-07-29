"use server";

import prisma from "@/db/prisma";
import {
  revalidatePath
} from "next/cache";
import {
  auth
} from "@/auth";

export async function buyProducts(checkout) {
  try {
    const session = await auth();
    const {
      enableToBuy,
      newBalance,
      user_id,
      subTotal
    } = checkout;

    if (!enableToBuy)
      return {
        error: "No cuentas el saldo suficiente para comprar !"
      };

    //enable tickets
    await prisma.cartUserProducts.updateMany({
      where: {
        AND: [{
            id_user: user_id
          },
          {
            enableToBuy: true
          },
          {
            ticket_enabled: false
          },
        ],
      },
      data: {
        enableToBuy: false,
        ticket_enabled: true,
        purchaseAt: new Date(),
      },
    });

    //TODO Testing new tables change it for tickets but rn only for bills
    const products_orders = checkout.products.map(product => ({
      product_name: product.product.name,
      quantity: +product.quantity,
      product_price: +product.product.price
    }))

    const order = await prisma.orders.create({
      data: {
        id_user: session.user.id,
        totalPrice: subTotal,
        ordersProducts: {
          create: products_orders
        }
      }
    })

    await prisma.users.update({
      where: {
        id: user_id,
      },
      data: {
        balance: newBalance,
      },
    });

    revalidatePath("/");
    return true;
  } catch (error) {
    console.log(error);
    return {
      error: "Hubo un error en el servidor"
    };
  }
}