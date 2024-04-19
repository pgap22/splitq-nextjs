"use client"

import { setNewPassword } from "@/actions/setNewPassword";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form"
import FormInput from "./FormInput";
import { Button } from "../ui/button";
import Loader from "../Loader";

export default function FormNewPassword({ id_user }) {
    const { register, handleSubmit, formState, watch} = useForm({
        defaultValues: {
            password: ''
        }
    });
    const [error, setError] = useState()
    const [loading, startChanging] = useTransition();
    const [success, setSuccess] = useState();

    const updatePassword = (data) => {
        startChanging(async () => {
            const result = await setNewPassword(data.password, id_user);
            if (result?.error) {
                setError(result.error)
                return;
            }
            setSuccess(true)
        })
    }


    if (success) return (
        <>
            <h1 className="text-xl font-bold text-center">Cambio de Contraseña</h1>
            <p className="text-md text-text-secundary text-center mb-5">Tu contraseña se ha restablecido correctamente</p>
            <Link href={"/auth/login"}>
                <Button className="w-full">Iniciar Sesion</Button>
            </Link>
        </>
    )
    return (
        <form noValidate onSubmit={handleSubmit(updatePassword)}>
            <h1 className='font-bold text-2xl text-center'>Olvidaste tu contraseña ?</h1>
            <p className='text-text-secundary text-center'>Ingresa tu nueva contraseña</p>
            {error && <AlertWarning title={"Advertencia !"} description={error} />}

            <div className="mt-4">
                <FormInput
                    label={"Nueva contraseña"}
                    placeholder={"Contraseña"}
                    type={"password"}
                    showpass
                    value={watch("password")}
                    register={register("password", { required: { value: true, message: "Contraseña esta vacia" }, minLength: { value: 8, message: "Minimo 8 caracteres" } })}
                    error={formState.errors.password?.message}
                />
                <Button disabled={loading} className="mt-2 w-full">
                    {
                        loading
                            ? <Loader />
                            : "Cambiar Contraseña"
                    }

                </Button>
            </div>
        </form>
    )
}