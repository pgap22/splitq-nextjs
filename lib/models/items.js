import prismaDev from "@/db/prismaDev";

export const items = {
  async getItemsBySeller({ id_seller, type = "PRODUCT" }) {
    try {
      if (type == "ALL")
        return await prismaDev.items.findMany({
          orderBy: {
            createdAt: "asc",
          },
          where: {
            id_seller,
          },
        });

      return await prismaDev.items.findMany({
        orderBy: {
          createdAt: "asc",
        },
        where: {
          id_seller,
          item_type: type,
        },
      });
    } catch (error) {
      console.log(error);
      return { error: "Hubo un error en el servidor" };
    }
  },
  async getItemById({ id_item }) {
    const query = {
      where: {
        id: id_item,
      },
      include: {
        items_combo: {
          include: {
            product: true,
          },
        },
        combos: {
          include: {
            combo: true,
          },
        },
        images: true,
      },
    };
    const product = await prismaDev.items.findFirst(query);

    product.items_combo = product.items_combo.map((item) => ({
      ...item.product,
      quantity: item.quantity,
    }));

    return product;
  },
};
