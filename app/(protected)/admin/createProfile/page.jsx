"use client"
import IconBox from "@/components/ui/IconBox";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import FormInput from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { createUser } from "@/actions/createUser";
import { useState, useTransition } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils";
import Loader from "@/components/Loader";
import AlertWarning from "@/components/ui/AlertWarning";

export default function CreateProfile() {
    const [warning, setWarning] = useState(false)
    const [loading, startTransition] = useTransition();
    const { register, handleSubmit, formState, getValues, control } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            role: ""
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
        <div>
            <div className="flex items-center mb-8 gap-4">
                <Link href={"../admin"}>
                    <IconBox
                        Icon={MdArrowBack}
                    />
                </Link>
                <h1 className="text-2xl">Crear perfil</h1>
            </div>
            {warning && <AlertWarning
                title={"Advertencia"}
                description={warning}
            />} 
            <form noValidate onSubmit={handleSubmit(signup)} className="gap-4 flex flex-col">
                <FormInput
                    placeholder={"Nombre del perfil"}
                    label={"Nombre del perfil"}
                    type={"text"}
                    error={formState.errors.name?.message}
                    register={register("name", { required: { value: true, message: "Nombre esta vacio" } })}
                />
                <div>
                    <label>Rol del perfil</label>
                    <Controller
                        name="role"
                        control={control}
                        render={({ field }) => <Select onValueChange={field.onChange}>
                            <SelectTrigger className={cn("!bg-background !text-text-secundary !border", formState.errors.role?.message ? "!border-red-500" : getValues("role") ? "!border-blue-500" : "!border-border")}>
                                <SelectValue placeholder="Seleccione el rol" />
                            </SelectTrigger>
                            <SelectContent className="!bg-foreground">
                                <SelectGroup>
                                    <SelectLabel>Rol</SelectLabel>
                                    <SelectItem className="!bg-background" value="mod">Moderador</SelectItem>
                                    <SelectItem className="!bg-background" value="seller">Vendedor</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>}

                    />

                    <p className="text-red-500 text-xs mt-1">
                        {formState.errors.role?.message}
                    </p>
                </div>
                <FormInput
                    placeholder={"Correo del perfil"}
                    label={"Correo del perfil"}
                    type={"email"}
                    error={formState.errors.email?.message}
                    register={register("email", { required: { value: true, message: "Email esta vacio" }, pattern: { value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: "Debe ser un correo valido" } })}
                />
                <FormInput
                    placeholder={"Contraseña del perfil"}
                    label={"Contraseña del perfil"}
                    type={"password"}
                    error={formState.errors.password?.message}
                    register={register("password", { required: { value: true, message: "Contraseña esta vacia" }, minLength: { value: 8, message: "Minimo 8 caracteres" } })}
                />


                <Button disabled={loading} type="submit" className="font-bold">
                    {loading ? <Loader /> : "Crear Perfil"}
                </Button>
            </form>
        </div>
    )
}