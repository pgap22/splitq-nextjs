"use client"

import { setNewPassword } from "@/actions/setNewPassword";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form"
import FormInput from "./FormInput";
import { Button } from "../ui/button";
import Loader from "../Loader";
import { useLocalStorage } from "usehooks-ts";
import AlertWarning from "../ui/AlertWarning";

export default function FormNewPassword({ id_user, local }) {
    const { register, handleSubmit, formState, watch} = useForm({
        defaultValues: {
            password: ''
        }
    });
    const [error, setError] = useState()
    const [loading, startChanging] = useTransition();
    const [success, setSuccess] = useState();

    const [passToken, setPassToken] = useLocalStorage('recovery_token');


    const updatePassword = (data) => {
        startChanging(async () => {
            const result = await setNewPassword(data.password, id_user);
            if (result?.error) {
                setError(result.error)
                return;
            }

            setPassToken(result.passToken)
            setSuccess(true)
        })
    }


    if (success) return (
        <>
            <h1 className="text-xl font-bold text-center">Cambio de Contraseña</h1>
            <p className="text-md text-text-secundary text-center mb-5">Tu contraseña se ha restablecido correctamente</p>
            <AlertWarning
                title={"IMPORTANTE"}
                description={"Se te mostrara un codigo de recuperacion, este sera IMPORTANTE porque sera la manera en que puedas recuperar tu cuenta en caso no tengas tu contraseña"}
            />
            <p className="my-4">Tu codigo de recuperacion: <span className="font-black">{passToken}</span></p>
            
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