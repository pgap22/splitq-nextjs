"use client";

import { IconTabs } from "@/components/icon-tabs";
import dayjs from "dayjs";
import Link from "next/link";
import { useState } from "react";
import {
  MdOutlineCheckCircle,
  MdOutlineLocalActivity,
  MdOutlineLocalOffer,
} from "react-icons/md";

export default function TicketsView({ tickets }) {
  const [active, setItemType] = useState("enable");

  return (
    <>
      <div className="grid grid-cols-2 border-b border-border mb-4">
        <IconTabs
          label={"Disponibles"}
          Icon={MdOutlineLocalActivity}
          type={"enable"}
          setItemType={setItemType}
          active={active}
        />
        <IconTabs
          label={"Canjeados"}
          Icon={MdOutlineCheckCircle}
          type={"claimed"}
          active={active}
          setItemType={setItemType}
        />
      </div>
      {!tickets.length && <p className="p-4">No tienes tickets :(</p>}
      {tickets.length && tickets
        .filter((ticket) => {
          if (active == "enable" && !ticket.ticket_redeem) return ticket;
          if (active == "claimed" && ticket.ticket_redeem) return ticket;
        })
        .map((ticket) => (
          <CardProduct ticket={ticket} />
        ))}
    </>
  );
}

const CardProduct = ({ ticket }) => {
  const { product } = ticket;
  return (
    <Link
      href={"/home/tickets/" + ticket.id}
      className="border-b flex p-2 gap-2 border-border w-full"
    >
      {product?.images && product?.images.length ? (
        <img
          className="max-h-16 aspect-square object-contain rounded border border-border"
          src={product.images[0].url}
        />
      ) : (
        <div className="h-16 aspect-square rounded border border-border flex items-center justify-center">
          <MdOutlineLocalOffer size={30} />
        </div>
      )}
      <div className="flex flex-row justify-between w-full items-center">
        <div className="flex flex-col">
          <h1 className="font-bold text-lg">{product.name}</h1>
          <p className="text-xs text-text-secundary">{product.seller.name}</p>
          <div className="border text-text-secundary w-fit my-1 border-border text-xs p-1 rounded bg-foreground">
            Comprado {dayjs(ticket.purchaseAt).format("DD/MM/YYYY hh:mm:ss A")}
          </div>
          {ticket.claimedAt && (
            <div className="border text-text-secundary w-fit my-1 border-border text-xs p-1 rounded bg-foreground">
              Canejado {dayjs(ticket.claimedAt).format("DD/MM/YYYY hh:mm:ss A")}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
