"use client"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react";
import { socket } from "@/lib/socketio";

export default function LiveNotification() {
    const [enable, setEnable] = useState(false);
    const [recharge, setRecharge] = useState(null)
    const data = useSession();

    useEffect(() => {
        socket.connect()

        socket.emit("user_data", data.data.user.id)

        socket.on("recive_recharge", (data) => {
            setEnable(true)
            console.log(data)
            setRecharge(data)
            setTimeout(() => {
                setEnable(false)
                setRecharge(null)
            }, 5500);
        })
    }, [])

    if (!enable) return null

    return (
        <div onClick={() => {
            setEnable(false)
        }} className="absolute top-2 left-2 right-2 rounded font-bold bg-foreground border border-border p-2">
            Se ha recargado ${recharge} !
        </div>
    )
}