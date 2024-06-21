"use client"
import { createUser } from "@/actions/createUser";
import { resendEmailBVerification } from "@/actions/resendCode";
import Loader from "@/components/Loader";
import FormInput from "@/components/form/FormInput";
import AlertWarning from "@/components/ui/AlertWarning";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useLocalStorage } from "usehooks-ts";

export const ppr = true;

export default function SignUp() {
    const [warning, setWarning] = useState(false)
    const [loading, startTransition] = useTransition();
    const [loadingResend, startResending] = useTransition();
    const [succes, setSucces] = useState(false);
    const [passToken, setPassToken, clearPasstoken] = useLocalStorage('temp_recovery_token');
    const [recovery, setRecovery, clearRecovery] = useLocalStorage('recovery_token');
    const [accepted, setAccepted] = useState(false);
    const [userCreated, setUserCreated] = useState(false)
    const router = useRouter()

    const [id, setID] = useState();
    const { register, handleSubmit, formState, getValues, watch } = useForm({
        defaultValues: {
            name: "",
            lastname: "",
            email: "",
            password: ""
        }
    });


    useEffect(() => {
        if (passToken) {
            setUserCreated(true)
        }
    }, [])

    const acceptedRecovery = () => {
        if (accepted) {
            setAccepted(false)
            setPassToken(recovery)
            clearRecovery()
            return
        }
        setAccepted(true)
        setRecovery(passToken)
        clearPasstoken()
    }

    const signup = (data) => {
        setWarning(false)
        startTransition(async () => {
            data.email = data.email.toLowerCase().trim();
            const result = await createUser(data);
            if (result?.error) {
                setWarning(result.error)
            }

            if (result?.local) {
                setUserCreated(result)
                setPassToken(result.passToken)
                return
            }

            if (!result?.error) {
                setSucces(true)
                setID(result.id)

            }


        })

    }

    const resendEmail = () => {
        startResending(async () => {
            const result = await resendEmailBVerification(id)
            if (result?.error) {
                setWarning(result.error)
            }
        })
    }



    if (userCreated) return (
        <>
            <h1 className="text-xl font-bold text-center">Haz creado tu cuenta exitosamente</h1>
            <p className="text-md text-text-secundary text-center mb-5">Tu cuenta ha sido creada con exito en SplitQ, porfavor haz click en el boton para iniciar sesion y disfrutar de SplitQ<span className="opacity-5">👻</span></p>
            <AlertWarning
                title={"IMPORTANTE"}
                description={"Se te mostrara un codigo de recuperacion, este sera IMPORTANTE porque sera la manera en que puedas recuperar tu cuenta en caso no tengas tu contraseña"}
            />
            <p className="mt-4">Tu codigo de recuperacion: <span className="font-black">{passToken || recovery}</span></p>
            <label className="text-sm mt-4 flex items-center gap-2 text-gray-text" htmlFor="tos">
                <input onClick={acceptedRecovery} id="tos" type="checkbox" />
                <p>He copiado y guardado mi codigo de recuperacion</p>
            </label>
            {
                accepted && (<Button onClick={()=> router.push("/auth/login")} className="w-full mt-4">
                    Iniciar Sesion
                </Button>
                )
            }
        </>
    )

    if (succes) return (
        <>
            <h1 className="text-xl font-bold text-center">Verifica tu cuenta</h1>
            {warning && <AlertWarning
                title={"Advertencia"}
                description={warning}
            />}
            <p className="text-md text-text-secundary text-center mb-5">Hemos enviado a <span className="font-bold">{getValues("email")}</span> un link de verificacion, para que actives tu cuenta e ingreses a SplitQ <span className="opacity-5">👻</span></p>
            <Button disabled={loadingResend} onClick={resendEmail} >{
                loadingResend
                    ? <Loader />
                    : "Reenviar Codigo"
            }</Button>
        </>
    )

    return (
        <>
            <form noValidate onSubmit={handleSubmit(signup)} className='flex flex-col gap-4'>
                <div>
                    <h1 className='font-bold text-2xl '>Crear Cuenta</h1>
                    <p className='text-gray-400'>Crea una nueva cuenta en SplitQ</p>
                </div>
                {warning && <AlertWarning
                    title={"Advertencia"}
                    description={warning}
                />}
                <FormInput
                    label={"Nombre"}
                    placeholder={"Nombre"}
                    type={"text"}
                    register={register("name", { required: { value: true, message: "Nombre esta vacio" } })}
                    error={formState.errors.name?.message}
                />
                <FormInput
                    label={"Apellido"}
                    placeholder={"Apellido"}
                    type={"text"}
                    register={register("lastname", { required: { value: true, message: "Apellido esta vacio" } })}
                    error={formState.errors.lastname?.message}
                />

                <FormInput
                    label={"Email"}
                    placeholder={"Email"}
                    type={"text"}
                    register={register("email", { required: { value: true, message: "Email esta vacio" }, pattern: { value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: "Debe ser un correo valido" } })}
                    error={formState.errors.email?.message}
                />
                <FormInput
                    label={"Contraseña"}
                    placeholder={"Contraseña"}
                    type={"password"}
                    showpass
                    value={watch("password")}
                    register={register("password", { required: { value: true, message: "Contraseña esta vacia" }, minLength: { value: 8, message: "Minimo 8 caracteres" } })}
                    error={formState.errors.password?.message}
                />
                <div className="flex flex-col">
                    <Button disabled={loading} type="submit" className="font-bold">
                        {loading ? <Loader /> : "Crear Cuenta"}
                    </Button>
                    <Link className=" text-text-secundary underline  text-center mt-2" href={"/auth/login"}>¿Ya tienes cuenta? Inicia Sesion</Link>
                </div>
            </form>


        </>
    )
}





