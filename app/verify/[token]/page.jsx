"use client"
import { verifyToken } from "@/actions/verifyToken"
import Loader from "@/components/Loader";
import AlertWarning from "@/components/ui/AlertWarning";
import { useEffect, useState, useTransition } from "react"

export default function VerifyPage({ params }) {
    const [error, setError] = useState();
    const [loading, startVerifying] = useTransition();
    useEffect(() => {
        startVerifying(async () => {
            const token = await verifyToken(params.token);
            if (token.error) {
                setError(token.error)
            }
        })
    }, [])
    return (
        <div className="md:h-screen p-4 flex justify-center items-center">
            <div className="bg-foreground border border-border p-4 rounded-lg">
                <h1 className="text-2xl  mb-4 font-bold">Verificacion de cuenta</h1>
                {
                    loading
                        ? <div className="flex justify-center">
                            <Loader invert />
                        </div>
                        : error && <AlertWarning title={"Error"} description={error}/>
                }
            </div>
        </div>
    )
}