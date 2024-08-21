"use server";
import prisma from "@/db/prisma";
import { authUser } from "@/lib/authUser"
import { multiplyDecimal, sumDecimal } from "@/lib/decimal";
export async function getCheckout() {
  try {
    //Get User Cart Products and total
    const { id } = await authUser();
    const products = (
      await prisma.cartUserProducts.findMany({
        where: {
          AND: [{ id_user: id }, { enableToBuy: true }, { ticket_enabled: false }],
        },
        include: {
          combo: {
            include: {
                seller: true,
                products: true
            }
          },
          product: {
            include: {
                images: true,
                seller: true
            }
          },
        },
      })
    ).map((item) => {
      if (item.combo) {
        item.product = { ...item.combo };
        delete item.combo;
        return item;
      }
      return item;
    });

    if(!products.length) return {error: "No hay productos en el carrito!"}

    const productPrices = products.map((item) =>
      multiplyDecimal(item.quantity, item.product.price)
    );
    const subTotal = sumDecimal(...productPrices);
    
    
    //Check if user has suficient balance to buy all products from the cart
    const user = await prisma.users.findFirst({
      where: {
        id,
      },
      select: {
        balance: true,
      },
    });

    return {
        products,
        user_balance: user.balance,
        user_id: id,
        subTotal,
        enableToBuy: user.balance>=subTotal,
        newBalance: sumDecimal(user.balance, (-1*subTotal))
    }
  } catch (error) {
    console.log(error)
    return {error: "Hubo un error en el servidor"}
  }
}
