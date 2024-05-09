"use server";

import prismaDev from "@/db/prismaDev";

export async function getHistoryByUserId(id_user) {
  const [refounds, recharges, cart] = await Promise.all([
    prismaDev.userRefoundBalance.findMany({
      where: {
        id_user,
      },
      orderBy: {},
    }),
    prismaDev.recharges.findMany({
      where: {
        userID: id_user,
      },
      select: {
        createdAt: true,
        balance: true,
      },
    }),
    prismaDev.cartUserProducts.findMany({
      where: {
        id_user,
      },
      include: {
        product: {
          select: {
            name: true,
            price: true,
          },
        },
        combo: {
          select: {
            name: true,
            price: true,
          },
        },
      },
    }),
  ]);

  const refoundsActions = refounds.map((refound) => {
    const actions = [
      {
        date: refound.createdAt,
        value: refound.refoundBalance,
        status: "created",
        type: "refound",
      },
    ];
    if (refound.checkedAt) {
      actions.push({
        date: refound.checkedAt,
        value: refound.refoundBalance,
        status: refound.status,
        type: "refound",
      });
    }

    return actions;
  });

  const cartActions = cart.map((cart) => {
    const actions = [];
    if (cart.purchaseAt) {
      actions.push({
        date: cart.purchaseAt,
        value: cart.product || cart.combo,
        status: "pending_claim",
        type: "purchase"
      });
    }

    if(cart.claimedAt){
        actions.push({
            date: cart.claimedAt,
            value: cart.product || cart.combo,
            status: "claimed",
            type: "ticket"
        })
    }

    return actions;
  }).filter(actions => actions.length);

  console.log({
    refoundsActions,
    recharges,
    cartActions,
  });
}
