"use client"

import { socket } from "@/lib/socketio";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import TicketMakeRefund from "../buttons/TicketMakeRefund";
import { multiplyDecimal } from "@/lib/decimal";

export default function TicketInfoView({ ticket }) {
    const [myTicket, setMyTicket] = useState("loading")

    useEffect(() => {
        socket.connect()
        socket.emit("send-room", { room: ticket.id })

        return () => {
            socket.disconnect()
        }
    }, [])

    useEffect(() => {
        if (myTicket == "loading") return
        socket.on("ticket-individual-completed", data => {
            setMyTicket({
                ...myTicket,
                ...data
            })
        })
    }, [myTicket])

    useEffect(() => {
        setMyTicket(ticket)
    }, [ticket])

    if (myTicket == "loading") return <p className="py-4">Cargando Ticket...</p>

    const { product } = myTicket;
    return (
        <div className="mt-4 flex flex-col  justify-between">
            <div>
                {myTicket.claimedAt ? (
                    <div className="border text-text-secundary w-fit my-1 border-border text-xs p-1 rounded bg-foreground">
                        Canejado {dayjs(myTicket.claimedAt).format("DD/MM/YYYY hh:mm:ss A")}
                    </div>
                ) : (
                    <div className="bg-white p-4 w-fit mx-auto">
                        <QRCode value={myTicket.ticket_qr + "-ticket"} />
                    </div>
                )}

                <div className="flex flex-col mt-4">
                    <h1 className="font-bold text-3xl">{product.name}</h1>
                    {
                        (myTicket.request_refund && !myTicket.refunded) && (
                            <div className="border border-yellow-border-notification bg-yellow-bg-notification p-2 rounded-md my-2 w-fit">
                                <p className="text-yellow-text-notification">Solicitud de rembolso</p>
                            </div>
                        )
                    }
                    {
                        myTicket.refunded && (
                            <div className="border text-text-secundary w-fit my-1 border-border text-xs p-1 rounded bg-foreground">
                                Rembolsado {dayjs(myTicket.refundedAt).format("DD/MM/YYYY hh:mm:ss A")}
                            </div>
                        )
                    }
                    <p className="text-text-secundary text-lg mt-2 font-bold">
                        {product.seller.name}
                    </p>
                    <p className="text-text-secundary mt-4">{product.description}</p>
                </div>
                <p className="font-bold text-lg">
                    Cantidad de productos: {myTicket.quantity}
                </p>
            </div>
            {!myTicket.refunded && (<TicketMakeRefund refoundActive={myTicket.request_refund} id_ticket={myTicket.id} currentPrice={multiplyDecimal(myTicket.quantity, myTicket.product.price)} />)}
        </div>
    )
}