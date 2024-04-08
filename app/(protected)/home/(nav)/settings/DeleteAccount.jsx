"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import FormInput from "@/components/form/FormInput";
import { useMediaQuery } from "usehooks-ts";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import FormDeleteUser from "@/components/form/FormDeleteUser";


export default function DeleteAccount() {
    const [open, setOpen] = useState();
    return (
        <>
            <DeleteConfirm open={open} setOpen={setOpen} />
            <Button onClick={() => setOpen(true)} className="!bg-danger-action hover:!bg-red-900/80 w-full !text-white">Eliminar Cuenta</Button>
        </>
    )
}

function DeleteConfirm({ open, setOpen }) {
    const isDekstop = useMediaQuery("(min-width: 768px)")



    if (isDekstop) return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Deseas Eliminar tu Cuenta?</DialogTitle>
                    <DialogDescription>Escribe tu contraseña actual para eliminar tu cuenta</DialogDescription>
                </DialogHeader>
                <FormDeleteUser />
            </DialogContent>
        </Dialog>
    )


    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Deseas Eliminar tu Cuenta?</DrawerTitle>
                    <DrawerDescription>Escribe tu contraseña actual para eliminar tu cuenta</DrawerDescription>
                </DrawerHeader>

                <DrawerFooter>
                    <FormDeleteUser />
                    <DrawerClose className="w-full">
                        <Button className="w-full" variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}