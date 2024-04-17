"use client"

import { sendPasswordRequest } from "@/actions/sendPasswordRequest";
import Loader from "@/components/Loader";
import FormInput from "@/components/form/FormInput"
import AlertWarning from "@/components/ui/AlertWarning";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form"

export default function ForgetPassword() {
    const { register, formState, handleSubmit, getValues } = useForm({
        defaultValues: {
            email: ''
        }
    });
    const [loading, startSending] = useTransition();
    const [error, setError] = useState();
    const [sucess, setSucces] = useState();

    const sendVerification = (data) => {
        setError(false)
        startSending(async () => {
            const result = await sendPasswordRequest(data.email);
            if (result?.error) {
                setError(result.error)
                return
            }
            setSucces(true)
        })
    }

    if (sucess) return (
        <>


        
            <h1 className="text-xl font-bold text-center">Olvidar Contraseña</h1>
            {error && <AlertWarning
                title={"Advertencia"}
                description={error}
            />}
            <p className="text-md text-text-secundary text-center mb-5">Hemos enviado a <span className="font-bold">{getValues("email")}</span> un link de verificacion, para que actives tu cuenta e ingreses a SplitQ <span className="opacity-5">👻</span></p>
            <Button disabled={loading} onClick={sendVerification} >{
                loading
                    ? <Loader />
                    : "Reenviar"
            }</Button>
        </>
    )

    return (
        <form noValidate onSubmit={handleSubmit(sendVerification)}>
            <h1 className='font-bold text-2xl text-center'>Olvidaste tu contraseña ?</h1>
            <p className='text-text-secundary text-center'>Introduce el email que utilizastes para crear tu cuenta, te enviaremos un formulario para recuperar tu contraseña</p>
            {error && <AlertWarning title={"Advertencia !"} description={error} />}

            <div className="mt-4">
                <FormInput
                    label={"Email"}
                    placeholder={"Email"}
                    type={"text"}
                    register={register("email", { required: { value: true, message: "Email esta vacio" }, pattern: { value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: "Debe ser un correo valido" } })}
                    error={formState.errors.email?.message}
                />
                <Button disabled={loading} className="mt-2 w-full">
                    {
                        loading
                            ? <Loader />
                            : "Enviar"
                    }
                    
                </Button>
            </div>
        </form>
    )
}