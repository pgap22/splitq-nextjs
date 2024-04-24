"use client"

import { updateUser } from "@/actions/updateUser"
import { useEffect } from "react"

export default function UpdateUser({ data, children }) {
    useEffect(() => {
        (async()=>{
            await updateUser(data)
        })()
    }, [])
    return (<>
    {children}
    </>)
}