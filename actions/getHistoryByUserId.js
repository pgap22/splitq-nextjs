"use server";

import prisma from "@/db/prisma";

export async function getHistoryByUserId(id_user) {
  if (!id_user) return { error: "No userid provided" };
  const [refounds, recharges, cart] = await Promise.all([
    prisma.userRefoundBalance.findMany({
      where: {
        id_user,
      },
      orderBy: {
        createdAt: 'desc'
      },
    }),
    prisma.recharges.findMany({
      where: {
        userID: id_user,
      },
      select: {
        createdAt: true,
        balance: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.cartUserProducts.findMany({
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
    if (!actions.length) return null;

    if (actions.length > 1) return actions;

    return actions[0];
  });

  const rechargesActions = recharges.map((recharge) => ({
    date: recharge.createdAt,
    value: recharge.balance,
    type: "recharge",
  }));
  console.log(cart)
  const cartActions = cart
    .map((cart) => {
      const actions = [];
      if (cart.purchaseAt) {
        actions.push({
          date: cart.purchaseAt,
          value: cart.product || cart.combo,
          quantity: cart.quantity,
          status: "pending_claim",
          type: "purchase",
        });
      }

      if (cart.claimedAt) {
        actions.push({
          date: cart.claimedAt,
          value: cart.product || cart.combo,
          quantity: cart.quantity,
          status: "claimed",
          type: "ticket",
        });
      }

      if (!actions.length) return null;

      if (actions.length > 1) return actions;

      return actions[0];
    })
    .filter((actions) => actions);

  const allActions = [
    ...refoundsActions.flat(),
    ...rechargesActions,
    ...cartActions.flat(),
  ];

  const groupedActions = allActions.reduce((acc, action) => {
    const dateKey = new Date(action.date).toDateString();
    const existingGroup = acc.find((group) => group.date === dateKey);
    if (existingGroup) {
      existingGroup.actions.push(action);
    } else {
      acc.push({ date: dateKey, actions: [action] });
    }
    return acc;
  }, []).sort((a,b) => Number(new Date(a.date)) - Number(new Date(b.date))).reverse();

  groupedActions.map(date => {
    date.actions = date.actions.sort((a, b) => Number(new Date(a.date)) - Number(new Date(b.date))).reverse()
    return date;
  })

  return groupedActions;
}
