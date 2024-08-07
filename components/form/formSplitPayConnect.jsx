"use client"
import authCodeSplitPay from "@/actions/authCodeSplitPay";
import { Button } from "@/components/ui/button"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { socket } from "@/lib/socketio";
import { useSession } from "next-auth/react";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form"
import { useLocalStorage } from "usehooks-ts";
export default function FormSplitPayConnect() {
    const { handleSubmit, control } = useForm();
    const [authtoken, setAuthtoken] = useLocalStorage("authtoken", "");
    const [loading, startTransition] = useTransition();
    const [error, setError] = useState();
    const session = useSession();
    const submitAuthCode = (data) => {
        startTransition(async () => {
            setError("")
            const authResult = await authCodeSplitPay(data.authcode)
            if (authResult.status=='OK') {
                setAuthtoken(authResult.token)
                socket.emit("splitpay-auth", {...session.data})
                return
            }

            if (authResult.reason == "AUTHCODE_INVALID") {
                setError("El codigo de autentificacion para SplitPay es invalido !")
                return
            }

            setError("Error desconocido")

        })
    }

    return (
        <>
            {error && <div className="border border-danger-text text-red-text danger p-4 rounded-md text-sm my-4">{error}</div>}
            <form className="space-y-4" onSubmit={handleSubmit(submitAuthCode)}>
                <Controller
                    control={control}
                    rules={{ required: true }}
                    name="authcode"
                    render={({ field }) => (
                        <InputOTP {...field} onChange={(authcode) => {
                            field.onChange(authcode)
                            if ("" + authcode.split("").length >= 6) {
                                submitAuthCode({ authcode })
                            }
                            setError("")
                        }} disabled={loading} maxLength={6}>
                            <InputOTPGroup>
                                <InputOTPSlot className="w-14 h-20 text-[1.5rem]" index={0} />
                                <InputOTPSlot className="w-14 h-20 text-[1.5rem]" index={1} />
                                <InputOTPSlot className="w-14 h-20 text-[1.5rem]" index={2} />
                                <InputOTPSlot className="w-14 h-20 text-[1.5rem]" index={3} />
                                <InputOTPSlot className="w-14 h-20 text-[1.5rem]" index={4} />
                                <InputOTPSlot className="w-14 h-20 text-[1.5rem]" index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                    )}
                />
                <Button disabled={loading} className="w-full">Conectarse a SplitPay</Button>
            </form>
        </>
    )
}