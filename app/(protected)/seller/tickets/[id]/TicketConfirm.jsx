"use client";

import { confirmTicket } from "@/actions/confirmtTicket";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";

export default function TicketConfirm({ ticket }) {
  const [loading, startConfirm] = useTransition();
  const handleConfirmTicket = () => {
    startConfirm(async () => {
      await confirmTicket(ticket.id);
    });
  };

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
