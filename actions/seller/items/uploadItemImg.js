"use server";
import prisma from "@/db/prisma";
import prismaDev from "@/db/prismaDev";
import { uploadApiImageProduct } from "@/lib/uploadApiImageProduct";
import { revalidatePath } from "next/cache";
export async function uploadimgitem(formData, id_product) {
  try {
    const data_img = await uploadApiImageProduct(formData.get("file"));
    await prismaDev.itemImages.create({
      data: {
        public_id: data_img.public_id,
        url: data_img.url,
        item: {
          connect: {
            id: id_product,
          },
        },
      },
    });
    revalidatePath("/");
    return data_img;
  } catch (error) {
    console.log(error);
    return { error: "Hubo un error con el servidor" };
  }
}
