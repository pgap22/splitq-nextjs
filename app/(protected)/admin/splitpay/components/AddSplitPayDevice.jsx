"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState, useTransition } from "react";
import { HiOutlineCpuChip } from "react-icons/hi2";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import FormInput from "@/components/form/FormInput";
import Loader from "@/components/Loader";
import { MdOutlineCopyAll } from "react-icons/md";
import { useForm } from "react-hook-form";
import { createSplitPayDevice } from "@/actions/createSplitPayDevice";
export default function AddSplitPayDevice() {
    const [open, setOpen] = useState(false);
    const [loading, startTransition] = useTransition();
    const [splitpayToken, setSplitPayToken] = useState("");
    const [tokenCopiado, setTokenCopiado] = useState(false)
    const { register, handleSubmit, reset } = useForm()
    const copiarToken = () => {
        navigator.clipboard.writeText(splitpayToken)
        setTokenCopiado(true)
        setTimeout(() => {
            setTokenCopiado(false)
        }, 2000);
    }

    const enviarDatos = ({ name }) => {
        startTransition(async () => {
            try {
               const token = await createSplitPayDevice(name);
               setSplitPayToken(token);
        } catch (error) {
                console.log(error)
            }
        })
    }

    useEffect(()=>{
        if(!open){
            reset()
            setSplitPayToken("")
        }
    },[open])

    return (
        <>

            <Dialog open={open} onOpenChange={(e) => {
                if (loading) return
                setOpen(e)
            }}>
                <DialogTrigger asChild>
                    <Button className="mt-4 w-full md:w-auto">
                        <HiOutlineCpuChip size={24} className="mr-2" />
                        Agregar Dispositivo SplitPay</Button>
                </DialogTrigger>
                <DialogContent onInteractOutside={(e) => { e.preventDefault() }}>

                    {
                        splitpayToken
                            ? <>
                                <DialogHeader>
                                    <DialogTitle>Dispositivo Creado !</DialogTitle>
                                    <DialogDescription>
                                        Guarda este token para configurarlo a tu dispositivo SplitPay !
                                    </DialogDescription>
                                </DialogHeader>
                                <div>
                                    <p className="break-all"><span className="font-bold ">Token</span>: {splitpayToken}</p>
                                    <Button onClick={copiarToken} className="w-full mt-2">
                                        {
                                            tokenCopiado
                                                ? "Se ha copiado el token !"
                                                : <>
                                                    <MdOutlineCopyAll size={24} />
                                                    Copiar token
                                                </>
                                        }
                                    </Button>
                                </div>
                            </>
                            : <>
                                <DialogHeader>
                                    <DialogTitle>Agregar Dispositivo SplitPay</DialogTitle>
                                    <DialogDescription>
                                        Se generara un token para que tu configures tu dispositivo SplitPay, agrega un nombre para identificar este token
                                    </DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleSubmit(enviarDatos)}>
                                    <FormInput register={register("name")} label={"Nombre"} placeholder={"Nombre del dispositivo SplitPay"} />
                                    <Button disabled={loading} className="w-full mt-4 ">{
                                        loading
                                            ? <Loader />
                                            : "Agregar Dispositivo"
                                    }</Button>
                                </form>
                            </>
                    }
                </DialogContent>
            </Dialog>
        </>
    )
}