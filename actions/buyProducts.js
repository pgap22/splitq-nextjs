"use server";

import prismaDev from "@/db/prismaDev";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { getCheckout } from "./getCheckout";

// Extiende dayjs con los plugins necesarios
dayjs.extend(utc);
dayjs.extend(timezone);

export async function buyProducts(checkout) {
  try {
    const session = await auth();
    const {
      enableToBuy,
      newBalance,
      user_id,
      subTotal,
      productWithNoStock,
      products,
    } = await getCheckout();

    if (!enableToBuy)
      return {
        error: "No cuentas el saldo suficiente para comprar !",
      };

    if (productWithNoStock)
      return {
        error: "NO_STOCK_PRODUCT",
        product_name: productWithNoStock.product.name,
        currentStock: productWithNoStock.product.stock,
        quantity: productWithNoStock.quantity,
      };

    //TODO THIS WILL BE QUITED :)
    // Enable tickets
    await prismaDev.cartUserProducts.updateMany({
      where: {
        AND: [
          { id_user: user_id },
          { enableToBuy: true },
          { ticket_enabled: false },
        ],
      },
      data: {
        enableToBuy: false,
        ticket_enabled: true,
        purchaseAt: dayjs().tz("America/El_Salvador").toDate(),
      },
    });

    // Process orders
    const products_orders = products.map((product) => ({
      product_name: product.product.name,
      quantity: +product.quantity,
      product_price: +product.product.price,
    }));

    //Update Stock
    const updateStockItems = products.map((product) => ({
      id_product: product.product.id,
      quantity: +product.quantity,
      isCombo: !!product.product.products,
    }));

    //ew
    const updateQuery = updateStockItems.map((item) => {
      if (item.isCombo) {
        return prismaDev.combo.update({
          where: { id: item.id_product },
          data: { stock: { decrement: item.quantity } },
        });
      }
      return prismaDev.products.update({
        where: { id: item.id_product },
        data: { stock: { decrement: item.quantity } },
      });
    });

    //New Ticket System
    const ticketsForRedeem = products.map((product) => ({
      id_product: product.id_product ? product.id_product : product.id_combo,
      id_user: session.user.id,
      price: product.product.price,
      product_name: product.product.name,
      product_type: product.id_product ? "PRODUCT" : "COMBO",
      quantity: product.quantity,
      ticket_status: "TICKET_ENABLED",
    }));

    await Promise.all(updateQuery);

    //Create invoice
    await prismaDev.invoices.create({
      data: {
        id_user: session.user.id,
        totalPrice: subTotal,
        invoicesProducts: {
          create: products_orders,
        },
      },
    });

    //Create Tickets
    await prismaDev.tickets.createMany({
      data: ticketsForRedeem,
    });

    //Update Balance
    await prismaDev.users.update({
      where: { id: user_id },
      data: { balance: newBalance },
    });

    revalidatePath("/");
    return true;
  } catch (error) {
    console.log(error);
    return {
      error: "Hubo un error en el servidor",
    };
  }
}
