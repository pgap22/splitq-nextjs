"use client"
import { deleteSplitPay } from "@/actions/deleteSplitPayDevice";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import IconBox from "@/components/ui/IconBox";
import { useTransition } from "react";
import { MdOutlineDelete } from "react-icons/md";
export default function DeleteSplitPayDevice({id}) {
    const [loading, startTransition] = useTransition()
    const eliminarSplitPay = ()=>{
        startTransition(async()=>{
            try {
                await deleteSplitPay(id)
            } catch (error) {
                console.log(error)
            }
        })
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <IconBox variant="square" Icon={MdOutlineDelete} />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Deseas eliminar este dispositivo SplitPay ?</DialogTitle>
                    <DialogDescription>Esta accion no se puede deshacer</DialogDescription>
                </DialogHeader>
                <Button disabled={loading} onClick={eliminarSplitPay} variant="destructive">
                    {
                        loading
                        ? <Loader invert/>
                        : 'Eliminar Dispositivo'
                    }
                </Button>
            </DialogContent>
        </Dialog>
    )
}