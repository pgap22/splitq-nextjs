"use client"

import { useState, useTransition } from "react";
import AlertWarning from "../ui/AlertWarning"
import { Button } from "../ui/button"
import FormInput from "./FormInput"
import { useForm } from "react-hook-form";
import deleteAccount from "@/actions/deleteAccount";
import Loader from "../Loader";

export default function FormDeleteUser() {
    const [loading, startTransition] = useTransition();

    const [error, setError] = useState();
    const { register, handleSubmit, formState } = useForm({
        defaultValues: {
            password: ""
        }
    });

    const submitDelete = ({ password }) => {
        startTransition(async () => {
            const deleteResult = await deleteAccount(password)
            if (deleteResult?.error) {
                setError(deleteResult.error)
                return
            }
        })
    }
    return (
        <>
            {error && <AlertWarning title={"Advertencia"} description={error} />}
            <form className="space-y-2" onSubmit={handleSubmit(submitDelete)}>
                <FormInput
                    register={register("password", { required: { value: true, message: "Este campo es obligatorio" } })}
                    error={formState.errors.password?.message}
                    placeholder={"Contraseña"}
                    type="password"
                />
                <Button disabled={loading} className="!bg-danger-action hover:!bg-red-900/80 w-full !text-white">{
                    loading
                        ? <Loader invert/>
                        : "Estoy seguro de eliminar mi cuenta"
                }
                </Button>
            </form>

        </>
    )
}