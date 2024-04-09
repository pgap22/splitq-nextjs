"use client"
import Link from "next/link";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import IconBox from "@/components/ui/IconBox";
import FormInput from "@/components/form/FormInput";
import { cn } from "@/lib/utils";
import { Controller, useForm } from "react-hook-form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";
import { useState, useTransition } from "react";
import { updateProfile } from "@/actions/updateProfile";
import AlertWarning from "@/components/ui/AlertWarning";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { useRouter } from "next/navigation";


export default function UpdateAdmin({name, email, role, id}) {
    
    const router = useRouter()
    const [success, setSucess] = useState()
    const [warning, setWarning] = useState(false)
    const [loading, startTransition] = useTransition();
    const { register, handleSubmit, formState, getValues, control} = useForm({
        defaultValues: {
            name,
            email,
            role
        }
    })

    const submitData = (data)=>{
        startTransition(async () => {
            const result = await updateProfile(id, data);
            if (result.error) {
                setWarning(result.error)
                return
            }

            setSucess("Se ha actualizado correctamente")
        })
    }

    return (
        <div>
            <div className="flex flex-col mb-8 gap-4">
                <Link href={"/admin/manageProfile"}>
                        <IconBox
                            Icon={MdArrowBack}
                        />
                </Link>
                <h1 className="text-2xl">Editar perfil</h1>
            </div>

            {warning && <AlertWarning
                title={"Advertencia"}
                description={warning}
            />}

            <form noValidate onSubmit={handleSubmit(submitData)} className="flex flex-col gap-4">

                <FormInput
                    label={"Nombre del perfil"}
                    placeholder={"Nombre del perfil"}
                    register={register("name")}
                />

                <FormInput
                    label={"Correo del perfil"}
                    placeholder={"Correo del perfil"}
                    register={register("email")}
                />


            <div>
                    <label className={cn(formState.errors.role?.message && "!text-red-500", "label-valid")}>Rol del Perfil</label>
                    <Controller
                        name="role"
                        control={control}
                        render={({ field }) => <Select onValueChange={field.onChange}>
                            <SelectTrigger className={cn(!getValues("role") && "!text-text-secundary", "!bg-background !border", formState.errors.role?.message ? "!border-red-500" : getValues("role") ? "!border-blue-500" : "!border-border")}>
                                <SelectValue className="placeholder:text-text-secundary" placeholder="Seleccione el rol" />
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
                
                <Button disabled={loading} type="submit" className="font-bold">
                    {loading ? <Loader /> : "Editar Perfil"}
                </Button>

            </form>

            <Dialog open={success} onOpenChange={(data)=>{
                if (!data) {
                    router.push("/admin/manageProfile")
                }
                setSucess(data)
            }}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Cambios han sido exitosos</DialogTitle>
                        <DialogDescription>{success}</DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}