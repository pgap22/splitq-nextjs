"use client"
import { _DEV_SplitDeposit } from "@/actions/_DEV_SplitDeposit";
import authCodeSplitPay from "@/actions/authCodeSplitPay";
import { checkAuthSplitPay } from "@/actions/checkAuthSplitPay";
import finalizeSplitPayDeposit from "@/actions/finalizeSplitPayDeposit";
import { Button } from "@/components/ui/button"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { socket } from "@/lib/socketio";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form"
import { useLocalStorage } from "usehooks-ts";
export default function FormSplitPayConnect({ session, dev}) {
    const { handleSubmit, control } = useForm();
    const [authtoken, setAuthtoken] = useLocalStorage("authtoken", "");
    const [loading, startTransition] = useTransition();

    const [success, setSuccess] = useState(false);

    const [error, setError] = useState();
    const submitAuthCode = (data) => {
        startTransition(async () => {
            setError("")
            const authResult = await authCodeSplitPay(data.authcode)
            if (authResult.status == 'OK') {
                setAuthtoken(authResult.token)
                socket.emit("splitpay-auth", { ...session.user })
                setSuccess(true)
                return
            }

            if (authResult.error == "AUTHCODE_INVALID") {
                setError("El codigo de autentificacion para SplitPay es invalido !")
                return
            }

            setError("Error desconocido")

        })
    }

    const checkAuthCode = () => {
        startTransition(async () => {
            const data = await checkAuthSplitPay(authtoken)
            if (data.error) return setError("Hubo un error con el servidor de SplitPay")
            if (data.status == "FAILED") return setError("No se ha encontrado una sesion de SplitPay activa !")
            setSuccess(true)
        })
    }

    if (success) return <OnDepositSplitPay setSuccess={setSuccess} dev={dev} />

    return (
        <>
            <p className="text-gray-text">Introduce el codigo de que se muestra en la pantalla de <span className="text-gradient font-bold bg-aqua-gradient">SplitPay</span></p>
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
                <Button type="button" onClick={checkAuthCode} disabled={loading} className="w-full !bg-green-400">Reconectar a SplitPay</Button>
            </form>
        </>
    )
}


const OnDepositSplitPay = ({ setSuccess, dev}) => {
    const [authtoken, setAuthtoken, remove] = useLocalStorage("authtoken", "");
    const [loading, startTransition] = useTransition();
    const [error, setError] = useState();
    const handleFinalizarDeposito = () => {
        setError("")
        startTransition(async () => {
            const data = await finalizeSplitPayDeposit(authtoken);
            console.log(data)
            if (data.error) {

                if (!data.reason) {
                    setError("Hubo un error con el servidor")
                    return
                }

            }

            setSuccess(false)
            remove()
        })
    }

    //!ONLY DEV
    const handleDevDeposit = (amount) => {
        startTransition(async () => {
            const data = await _DEV_SplitDeposit(amount, authtoken)
            console.log(data)
        })
    }

    return (
        <div>
            {error && <div className="border border-danger-text text-red-text danger p-4 rounded-md text-sm my-4">{error}</div>}
            <p>Deposita la cantidad que desees en el monedero !</p>
            <p>Cuando hayas finalizado de depositar haz click en el boton para completar la recarga</p>
            <Button onClick={handleFinalizarDeposito} disabled={loading}>Finalizar Deposito</Button>

            {dev && (
                <>
                    <h2 className="text-red-500 mt-5">Dev MODE</h2>
                    <div className="grid grid-cols-5">
                        <Button disabled={loading} onClick={() => handleDevDeposit(1)} variant="outline">$1.00</Button>
                        <Button disabled={loading} onClick={() => handleDevDeposit(0.5)} variant="outline">$0.50</Button>
                        <Button disabled={loading} onClick={() => handleDevDeposit(0.25)} variant="outline">$0.25</Button>
                        <Button disabled={loading} onClick={() => handleDevDeposit(0.10)} variant="outline">$0.10</Button>
                        <Button disabled={loading} onClick={() => handleDevDeposit(0.05)} variant="outline">$0.05</Button>
                    </div>
                </>
            )}
        </div>
    )
}