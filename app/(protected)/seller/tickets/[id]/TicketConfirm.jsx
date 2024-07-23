"use client";

import { confirmTicket } from "@/actions/confirmtTicket";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { useEffect, useTransition } from "react";
import { socket } from "@/lib/socketio";

export default function TicketConfirm({ ticket }) {
  const [loading, startConfirm] = useTransition();

  const handleConfirmTicket = () => {
    startConfirm(async () => {
      const newTicket = await confirmTicket(ticket.id);
      socket.emit("ticket-individual", {
        room: ticket.id,
        ticket: newTicket
      })
    });
  };


  if(!ticket) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-background">
      <Button
        disabled={loading || ticket.ticket_redeem}
        onClick={handleConfirmTicket}
        className="w-full"
      >
        {loading ? <Loader /> : "Confirmar Entrega"}
      </Button>
    </div>
  );
}
