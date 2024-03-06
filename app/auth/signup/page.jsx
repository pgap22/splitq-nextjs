"use client"
import { createUser } from "@/actions/createUser";
import Loader from "@/components/Loader";
import FormInput from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineWarningAmber } from "react-icons/md";

export default function SignUp() {
    const [warning, setWarning] = useState(false)
    const [loading, startTransition] = useTransition();
    const { register, handleSubmit, formState, } = useForm({
        defaultValues: {
            name: "",
            lastname: "",
            email: "",
            password: ""
        }
    });

    const signup = (data) => {
        setWarning(false)
        startTransition(async () => {
            const result = await createUser(data);
            if (result) {
                setWarning(result.error)
            }
        })

    }


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
                    register={register("password", { required: { value: true, message: "Contraseña esta vacia" }, minLength: { value: 8, message: "Minimo 8 caracteres" } })}
                    error={formState.errors.password?.message}
                />
                <Button disabled={loading} type="submit" className="font-bold">
                    {loading ? <Loader /> : "Crear Cuenta"}
                </Button>
            </form>


        </>
    )
}





