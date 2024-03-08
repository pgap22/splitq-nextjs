"use client"
import login from "@/actions/login";
import Loader from "@/components/Loader";
import FormInput from "@/components/form/FormInput";
import AlertWarning from "@/components/ui/AlertWarning";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

export default function LoginPage() {
    const { register, formState, handleSubmit } = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const [loading, startTransition] = useTransition();
    const [warning, setWarning] = useState();
    const submitLogin = (data) => {
        setWarning(false);
        startTransition(async () => {
            const loginResult = await login(data)
            if(loginResult.error){
                setWarning(loginResult.error);
            }
        })
    }

    return (
        <form onSubmit={handleSubmit(submitLogin)} noValidate className='flex flex-col gap-4'>
            <h1 className='font-bold text-2xl text-center'>Iniciar Sesion</h1>
            <p className='text-text-secundary text-center'>Accede a nuestra plataforma</p>

            {warning && <AlertWarning title={"Advertencia !"} description={warning} />}

            <div className="flex flex-col gap-4 w-full">
                <FormInput
                    label={"Email"}
                    placeholder={"Email"}
                    type={"text"}
                    error={formState.errors.email?.message}
                    register={register("email", { required: { value: true, message: "Email esta vacio" }, pattern: { value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: "Debe ser un correo valido" } })}
                />
                <FormInput
                    label={"Contraseña"}
                    placeholder={"Contraseña"}
                    type={"password"}
                    error={formState.errors.password?.message}
                    register={register("password", { required: { value: true, message: "Contraseña esta vacia" }, minLength: { value: 8, message: "Minimo 8 caracteres" } })}
                />
            </div>
            <p className='text-text-secundary text-sm underline'>Olvidaste tu contraseña?</p>
            <div className="flex flex-col">
                <Button className="font-bold">
                    {loading ? <Loader /> : "Iniciar Sesion"}
                </Button>
                <Link className=" text-text-secundary underline  text-center mt-2" href={"/auth/signup"}>¿No tienes cuenta? Crea tu cuenta</Link>
            </div>
        </form>
    )
}

