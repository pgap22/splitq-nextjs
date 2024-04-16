"use client"
import AlertWarning from "@/components/ui/AlertWarning";
import Loader from "@/components/Loader";
import { useSession } from "next-auth/react"
import { useEffect, useState, useTransition } from "react"
import { useRouter } from "next/navigation";

export default function LoaderUpdate({token}) {
    const { update } = useSession();
    const router = useRouter();
    const [error, setError] = useState();
    const [loading, startUpdating] = useTransition();


    useEffect(()=>{
        startUpdating(async()=>{
            if(!token.id) {
                setError("Hubo un error con el token")
                return;
            };

            await update({
                user: token
            })

            router.push("/")
            
        })
    },[])

    return (
        <div className="md:h-screen p-4 flex justify-center items-center">
            <div className="bg-foreground border border-border p-4 rounded-lg">
                <h1 className="text-2xl  mb-4 font-bold">Cambio de email</h1>
                {
                    loading
                        ? <div className="flex justify-center">
                            <Loader invert />
                        </div>
                        : error && <AlertWarning description={error}/>
                }
            </div>
        </div>
    )
}