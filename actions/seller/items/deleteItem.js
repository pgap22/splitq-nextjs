"use server";
import prismaDev from "@/db/prismaDev";
export default async function deleteItem(id) {
  try {
    await prismaDev.items.delete({
      where: {
        id,
      },
    });
    return true;
  } catch (error) {
    console.log(error);
    return { error: "Hubo un error en el servidor" };
  }
}
