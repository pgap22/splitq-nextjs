"use server";

import prismaDev from "@/db/prismaDev";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function buyProducts(checkout) {
  try {
    const session = await auth();
    const { enableToBuy, newBalance, user_id, subTotal } = checkout;

    if (!enableToBuy)
      return {
        error: "No cuentas el saldo suficiente para comprar !",
      };

    //Detect Stock on Buying
    const productsCart = await prismaDev.cartUserProducts.findMany({
      where: {
        AND: [{ id_user: session.user.id }, { enableToBuy: true }, {ticket_enabled: false}],
      },
      include: {
        product: true,
        combo: true,
      },
    });

    const productWithNoStock = productsCart
      .map((item) => {
        if (item.combo) {
          item.product = { ...item.combo };
          delete item.combo;
          return item;
        }
        return item;
      })
      .find((product) => product.quantity > product.product.stock);
    console.log(productsCart);

    if (productWithNoStock)
      return {
        error: "NO_STOCK_PRODUCT",
        product_name: productWithNoStock.product.name,
        currentStock: productWithNoStock.product.stock,
        quantity: productWithNoStock.quantity,
      };

    //enable tickets
    await prismaDev.cartUserProducts.updateMany({
      where: {
        AND: [
          {
            id_user: user_id,
          },
          {
            enableToBuy: true,
          },
          {
            ticket_enabled: false,
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
    const products_orders = checkout.products.map((product) => ({
      product_name: product.product.name,
      quantity: +product.quantity,
      product_price: +product.product.price,
    }));

    const updateStockItems = checkout.products.map((product) => ({
      id_product: product.product.id,
      quantity: +product.quantity,
      isCombo: !!product.product.products,
    }));

    const updateQuery = updateStockItems.map((item) => {
      if (item.isCombo) {
        return prismaDev.combo.update({
          where: {
            id: item.id_product,
          },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }
      return prismaDev.products.update({
        where: {
          id: item.id_product,
        },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    });

    await Promise.all(updateQuery);

    const order = await prismaDev.orders.create({
      data: {
        id_user: session.user.id,
        totalPrice: subTotal,
        ordersProducts: {
          create: products_orders,
        },
      },
    });

    await prismaDev.users.update({
      where: {
        id: user_id,
      },
      data: {
        balance: newBalance,
      },
    });

    return true;
  } catch (error) {
    console.log(error);
    return {
      error: "Hubo un error en el servidor",
    };
  }
}
