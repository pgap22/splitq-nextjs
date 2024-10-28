import prisma from "@/db/prisma";

export default async function getTicketsRefound(id_user) {
  try {
    const tickets = await prisma.cartUserProducts.findMany({
      where: {
        id_user,
        request_refund: true,
        refunded: false,
      },
      include: {
        product: {
          include: {
            images: true,
            seller: true,
          },
        },
        combo: {
          include: {
            seller: true,
          },
        },
      },
    });
    return tickets.map((item) => {
      if (item.combo) {
        item.product = {
          ...item.combo,
        };
        delete item.combo;
        return item;
      }
      return item;
    });
  } catch (error) {
    console.log(error);
  }
}
