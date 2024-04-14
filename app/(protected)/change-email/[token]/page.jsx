"use client"
import { verifyEmailToken } from "@/actions/verifyEmailToken";
import Loader from "@/components/Loader";
import { useSession } from "next-auth/react"
import AlertWarning from "@/components/ui/AlertWarning";
import { useEffect, useState, useTransition } from "react"
import { useRouter } from "next/navigation";

export default function VerifyPage({ params }) {
    const [error, setError] = useState();
    const [loading, startVerifying] = useTransition();
    const router = useRouter();
    const { update } = useSession();

    useEffect(() => {
        startVerifying(async () => {
            const token = await verifyEmailToken(params.token)

            if (token.error) {
                setError(token.error)
                router.push("/")
                return
            }

            await update({
                user: token
            })

            router.push("/")
        })
    }, [])
    return (
        <div className="md:h-screen p-4 flex justify-center items-center">
            <div className="bg-foreground border border-border p-4 rounded-lg">
                <h1 className="text-2xl  mb-4 font-bold">Cambio de email</h1>
                {
                    loading
                        ? <div className="flex justify-center">
                            <Loader invert />
                        </div>
                        : error && <AlertWarning title={"Error"} description={error} />
                }
            </div>
        </div>
    )
}
