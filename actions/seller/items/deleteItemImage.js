"use server";
import prisma from "@/db/prisma";
import prismaDev from "@/db/prismaDev";
import { destroyApiImageProduct } from "@/lib/destroyApiImageProduct";
import { revalidatePath } from "next/cache";

export default async function deleteItemImage(public_id, url) {
  try {
    if (!public_id) return;

    await destroyApiImageProduct(public_id, url);

    // if (data.result !== "ok") return { error: "No se pudo borrar la imagen" };

    await prismaDev.itemImages.deleteMany({
      where: {
        public_id,
      },
    });
    revalidatePath("/");
    return true;
  } catch (error) {
    console.log(error);
    return { error: "Hubo un error en el servidor" };
  }
}
