"use client"
import { Button } from "@/components/ui/button";
import FormInput from "@/components/form/FormInput"
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react"
import { updateProfileGeneral } from "@/actions/updateProfileGeneral";
import { useState, useTransition } from "react";
import Loader from "../Loader";
import AlertWarning from "../ui/AlertWarning";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
export default function FormUpdateProfile() {
    const { register, handleSubmit, formState, reset } = useForm({
        defaultValues: {
            name: "",
            lastname: "",
            email: "",
        }
    });
    const [error, setError] = useState();
    const [loading, startUpdating] = useTransition();
    const [success, setSucess] = useState();
    const { update, data: { user } } = useSession();


    const updateProfile = (data) => {

        startUpdating(async () => {
            if (!data.name) {
                delete data.name
            }
            if (!data.lastname) {
                delete data.lastname
            }
            if (!data.email) {
                delete data.email
            }


            const updateUser = await updateProfileGeneral(data, "/home/settings")

            if (updateUser?.error) {
                setError(updateUser.error)
            }

            if (updateUser.id) {
                update({
                    user: updateUser
                })
                setSucess("Se han hecho los cambios correctamente !")
                reset();
            }
        })

    }

    return (
        <>
            <form noValidate onSubmit={handleSubmit(updateProfile)} className="space-y-4">
                {
                    error && <AlertWarning title={"Advertencia"} description={error} />
                }
                <FormInput
                    register={register("name", {
                        pattern: {
                            value: /[a-zA-Z]/,
                            message: "Nombre no valido"
                        }
                    })}
                    label={"Nombre"}
                    error={formState.errors.name?.message}
                    placeholder={user.name} />


                <FormInput
                    register={register("lastname", {
                        pattern: {
                            value: /[a-zA-Z]/,
                            message: "Apellido no valido"
                        }
                    })}
                    error={formState.errors.lastname?.message}
                    label={"Apellido"}
                    placeholder={user.lastname} />

                <FormInput
                    register={register("email", {
                        pattern: {
                            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                            message: "Este no es un correo valido"
                        }
                    })}
                    label={"Email"}
                    error={formState.errors.email?.message}
                    placeholder={user.email} />

                <Button className="w-full">{
                    loading ? <Loader /> : "Guardar Cambios"
                }</Button>
            </form>
            <Dialog open={success} onOpenChange={setSucess}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Cambios han sido exitosos</DialogTitle>
                        <DialogDescription>{success}</DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}   