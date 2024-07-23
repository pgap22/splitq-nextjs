"use client";

import { IconTabs } from "@/components/icon-tabs";
import TicketCard from "@/components/TicketCard";
import { socket } from "@/lib/socketio";

import { useEffect, useState, useTransition } from "react";
import {
  MdOutlineCheckCircle,
  MdOutlineLocalActivity,
} from "react-icons/md";

export default function TicketsView({ user_id }) {
  const [active, setItemType] = useState("enable");
  const [myTickets, setMyTickets] = useState("loading")


  useEffect(() => {
    socket.connect()
    socket.emit("get_tickets", user_id)
    socket.emit("ticket-room", user_id)
    socket.on("current_tickets", data => {
      setMyTickets(data.payload)
    })

    return () => {
      socket.disconnect()
    }

  }, [])

  useEffect(() => {
    if (myTickets == "loading") return
    socket.on("ticket-completed", data => {

      const updated = myTickets.map(ticket => {
        const newTicket = data.find(item => ticket.id == item.id)
        if (newTicket) {
          ticket = {
            ...ticket,
            ...newTicket
          }
          console.log(ticket)
          return ticket
        }
        return ticket
      })
      setMyTickets(updated)
    }
    )
  }, [myTickets])


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
      {myTickets == "loading" ? <p className="p-4">Cargando Tickets</p> : !!myTickets.length && myTickets
        .filter((ticket) => {
          if (active == "enable" && !ticket.ticket_redeem) return ticket;
          if (active == "claimed" && ticket.ticket_redeem) return ticket;
        })
        .map((ticket) => (
          <TicketCard ticket={ticket} />
        ))}
      {!myTickets.length && <p className="p-4">No tienes tickets :(</p>}
    </>
  );
}

