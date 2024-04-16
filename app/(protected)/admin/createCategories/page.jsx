"use client"
import IconBox from "@/components/ui/IconBox";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import FormInput from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { createCategorie } from "@/actions/createCategorie";
import { useState, useTransition } from "react";
import Loader from "@/components/Loader";
import AlertWarning from "@/components/ui/AlertWarning";
import { useRouter } from "next/navigation";


export default function CreateCategorie() {
    const router = useRouter()
    const [warning, setWarning] = useState(false)
    const [loading, startTransition] = useTransition();
    const { register, handleSubmit, formState, getValues, control } = useForm({
        defaultValues: {
            name: ""
        }
    });

    const creating = (data) => {
        setWarning(false)
        startTransition(async () => {
            const result = await createCategorie(data);
            if (result) {
                setWarning(result.error)
            }

            if (!warning) {
                router.push("../admin")
            }
        })

    }
    return (
        <div className="p-4">
            <div className="flex items-center mb-8 gap-4">
                <Link href={"../admin"}>
                    <IconBox
                        Icon={MdArrowBack} variant={'square'}
                    />
                </Link>
                <h1 className="text-2xl">Crear Categoria</h1>
            </div>
            {warning && <AlertWarning
                title={"Advertencia"}
                description={warning}
            />}
            <form noValidate onSubmit={handleSubmit(creating)} className="gap-4 flex flex-col">
                <FormInput
                    placeholder={"Nombre de la categoria"}
                    label={"Nombre de la categoria"}
                    type={"text"}
                    error={formState.errors.name?.message}
                    register={register("name", { required: { value: true, message: "Nombre esta vacio" } })}
                />

                <Button disabled={loading} type="submit" className="font-bold">
                    {loading ? <Loader /> : "Crear Categoria"}
                </Button>
            </form>
        </div>
    )
}