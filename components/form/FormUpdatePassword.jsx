"use client"
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import FormInput from "./FormInput";
import { useState, useTransition } from "react";
import { updatePassword } from "@/actions/updatePassword";
import AlertWarning from "../ui/AlertWarning";
import Loader from "../Loader";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";

export default function FormUpdatePassword() {
    const {register, handleSubmit, formState, reset, watch} = useForm({
        defaultValues:{
            oldpass: "",
            newpass: "",
        }
    });
    const [success, setSuccess] = useState();
    const [error, setError] = useState()
    const [pending, startTransition] = useTransition();
    
    const submitPassword = (data)=>{
        startTransition(async()=>{
            setError()
            const passordCheck = await updatePassword(data)
            if(passordCheck.error){
                setError(passordCheck.error)
                return
            }

            setSuccess("Se ha cambiado la contraseña correctamente")
            reset();
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit(submitPassword)} className="flex flex-col gap-4">
                
                {
                    error && <AlertWarning title={"Advetencia"} description={error} />
                }

                <FormInput
                    type={"password"}
                    register={register("oldpass", {required: {value: true, message: "Este campo es obligatorio"}})}
                    
                    value={watch("oldpass")}
                    placeholder={"Contraseña Actual"}
                    label={"Contraseña Actual"}
                />
                <FormInput
                    register={register("newpass",{required: {value: true, message: "Este campo es obligatorio"}})}
                    value={watch("newpass")}

                    type={"password"}
                    placeholder={"Nueva Contraseña"}
                    label={"Nueva Contraseña"}
                />
                <Button disabled={pending || (!watch("oldpass") || !watch("newpass"))}>{
                    pending
                    ? <Loader />
                    : "Cambiar Contraseña"
                }</Button>
            </form>
            <Dialog open={success} onOpenChange={setSuccess}>
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