"use server";
import prisma from "@/db/prisma";
import prismaDev from "@/db/prismaDev";
import { authUser } from "@/lib/authUser";
import { category } from "@/lib/models/category";
import { getProductByName } from "@/lib/products";
import { revalidatePath } from "next/cache";
export async function editItem(id_item, data, products = []) {
  try {
    const { id } = await authUser();
    const productNameExist = await getProductByName(data.name);
    if (productNameExist)
      return { error: "Ya existe un producto con ese nombre" };

    if (data.item_type == "COMBO") {
      if (products.length < 1)
        return { error: "Agrega al menos un producto al combo !" };
    }

    let productData = {};

    if (data.item_type == "PRODUCT") {
      productData = {
        category: {
          connect: {
            id: data.id_category,
          },
        },
        stock: data.stock,
      };
    }

    if (data.item_type == "COMBO") {
      await prismaDev.itemsCombo.deleteMany({
        where: {
          id_item_combo: id_item,
        },
      });
    }

    await prismaDev.items.update({
      where: {
        id: id_item,
      },
      data: {
        name: data.name,
        price: data.price,
        description: data.description,
        item_type: data.item_type,
        ...productData,
        items_combo: {
          createMany: {
            data: products.map((item) => ({
              id_item_product: item.id,
              quantity: item.quantity,
            })),
          },
        },
        seller: {
          connect: {
            id,
          },
        },
      },
    });

    revalidatePath("/");
    return true;
  } catch (error) {
    console.log(error);
    return { error: "Hubo un error en el servidor" };
  }
}
