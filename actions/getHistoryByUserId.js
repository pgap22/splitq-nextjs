"use server";

import prisma from "@/db/prisma";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import prismaDev from "@/db/prismaDev";

// Configura dayjs con los plugins necesarios
dayjs.extend(utc);
dayjs.extend(timezone);

export async function getHistoryByUserId(id_user) {
  if (!id_user) return { error: "No userid provided" };

  const [refounds, recharges, cart, tickets_refound] = await Promise.all([
    prisma.userRefoundBalance.findMany({
      where: {
        id_user,
      },
      orderBy: {
        createdAt: "desc",
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
    prisma.cartUserProducts.findMany({
      where: {
        id_user,
        refunded: true,
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

  const ticketRefoundAction = tickets_refound.map((ticketRefound) => ({
    date: dayjs(ticketRefound.refundedAt).tz("America/El_Salvador").toDate(),
    value: ticketRefound.product || ticketRefound.combo,
    quantity: ticketRefound.quantity,
    type: "ticket_refund",
  }));

  const refoundsActions = refounds.map((refound) => {
    const actions = [
      {
        date: dayjs(refound.createdAt).tz("America/El_Salvador").toDate(),
        value: refound.refoundBalance,
        status: "created",
        type: "refound",
      },
    ];
    if (refound.checkedAt) {
      actions.push({
        date: dayjs(refound.checkedAt).tz("America/El_Salvador").toDate(),
        value: refound.refoundBalance,
        status: refound.status,
        type: "refound",
      });
    }
    return actions.length > 1 ? actions : actions[0];
  });

  const rechargesActions = recharges.map((recharge) => ({
    date: dayjs(recharge.createdAt).tz("America/El_Salvador").toDate(),
    value: recharge.balance,
    type: "recharge",
  }));

  const cartActions = cart
    .map((cart) => {
      const actions = [];
      if (cart.purchaseAt) {
        actions.push({
          date: dayjs(cart.purchaseAt).tz("America/El_Salvador").toDate(),
          value: cart.product || cart.combo,
          quantity: cart.quantity,
          status: "pending_claim",
          type: "purchase",
        });
      }

      if (cart.claimedAt) {
        actions.push({
          date: dayjs(cart.claimedAt).tz("America/El_Salvador").toDate(),
          value: cart.product || cart.combo,
          quantity: cart.quantity,
          status: "claimed",
          type: "ticket",
        });
      }
      return actions.length > 1 ? actions : actions[0];
    })
    .filter(Boolean);

  const allActions = [
    ...refoundsActions.flat(),
    ...rechargesActions,
    ...cartActions.flat(),
    ...ticketRefoundAction,
  ];

  const groupedActions = allActions
    .reduce((acc, action) => {
      const dateKey = dayjs(action.date)
        .tz("America/El_Salvador")
        .format("YYYY-MM-DD");
      console.log(dateKey);
      const existingGroup = acc.find((group) => group.date === dateKey);
      if (existingGroup) {
        existingGroup.actions.push(action);
      } else {
        acc.push({ date: dateKey, actions: [action] });
      }
      return acc;
    }, [])
    .sort((a, b) => dayjs(b.date).diff(dayjs(a.date)));

  groupedActions.forEach((date) => {
    date.actions = date.actions.sort((a, b) =>
      dayjs(b.date).diff(dayjs(a.date))
    );
  });

  return groupedActions;
}
