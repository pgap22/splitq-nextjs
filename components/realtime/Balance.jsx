"use client"

import { sumDecimal } from "@/lib/decimal"
import { socket } from "@/lib/socketio"
import { useEffect, useState } from "react"

export default function Balance({balance,id}) {
    const [currentBalance, setCurrentBalance] = useState(+balance)

    useEffect(()=>{
        socket.connect()

        socket.emit("get_balance", id)

        
        socket.on("add_balance", (data)=>{
            setCurrentBalance(sumDecimal(data.balance, data.recharge))
        })
        
        socket.on("current_balance", (data)=>{
            setCurrentBalance(data.balance)
        })

        return ()=>{
            socket.disconnect()
        }
    },[])

    return (
        <div className="bg-foreground border-border border rounded p-4">
            <h1 className="font-bold text-2xl">
                Tu saldo:{" "}
                <span className="font-bold text-gradient-principal text-gradient bg-gradient-principal">
                    ${currentBalance}
                </span>
            </h1>
            <p className="text-text-secundary text-md">
                Tu saldo actual para comprar productos dentro de{" "}
                <span className="font-bold text-gradient-principal text-gradient bg-gradient-principal">
                    SplitQ
                </span>
            </p>
        </div>
    )
}