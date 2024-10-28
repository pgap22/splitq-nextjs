"use client"

import { useTransition } from "react"
import { Button } from "../ui/button"
import acceptTicketRefund from "@/actions/acceptTicketRefund"

const ModTicketAcceptRefound = ({ticket}) => {
    const [loading, startTransition] = useTransition()
    console.log(ticket.user.id)
    const acceptRefound = ()=>{
        startTransition(async()=>{
            try {
                await acceptTicketRefund(ticket.id, ticket.user.id)
            } catch (error) {
                
            }
        })
    }

    return (
        <Button disabled={loading} onClick={acceptRefound}>Aceptar Devolucion</Button>
    )
}

export default ModTicketAcceptRefound