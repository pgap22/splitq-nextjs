"use client"
import Link from "next/link";
import { MdArrowBack, MdArrowForward, MdDelete } from "react-icons/md";
import IconBox from "@/components/ui/IconBox";
import FormInput from "@/components/form/FormInput";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";
import { useState, useTransition } from "react";
import { updateCategorie } from "@/actions/updateCategories";
import AlertWarning from "@/components/ui/AlertWarning";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { useRouter } from "next/navigation";
import { deleteCategorie } from "@/actions/deleteCategorie";
import FormSelect from "./FormSelect"


export default function FormUpdateCategories({name, id, categorias}) {
    
    const router = useRouter()
    const [success, setSucess] = useState()
    const [confirmDelete, setConfirm] = useState()
    const [warning, setWarning] = useState(false)
    const [loading, startTransition] = useTransition();
    const [loadingDelete, startDelete] = useTransition()
    const { register, handleSubmit, formState, getValues, control} = useForm({
        defaultValues: {
            name
        }
    })

    const FilteredCategories = categorias.filter(categoria => categoria.id !== id)


    const submitData = (data)=>{
        startTransition(async () => {
            const result = await updateCategorie(id, data);
            if (result.error) {
                setWarning(result.error)
                return
            }

            setSucess("Se ha actualizado correctamente")
        })
    }

    function deleteUser() {
        
        startDelete(async()=>{
            const result = await deleteCategorie(id)
            router.push("/admin/manageCategories")
        })
    }


    return (
        <div>
            <div className="flex flex-col mb-8 gap-4">
                <Link href={"/admin/manageCategories"}>
                        <IconBox
                            Icon={MdArrowBack} variant={'square'}
                        />
                </Link>
                <h1 className="text-2xl">Editar Categoria</h1>
            </div>

            {warning && <AlertWarning
                title={"Advertencia"}
                description={warning}
            />}

            <form noValidate onSubmit={handleSubmit(submitData)} className="flex flex-col gap-4">

                <FormInput
                    label={"Nombre de la categoria"}
                    placeholder={"Nombre de la categoria"}
                    register={register("name")}
                />
                

                <div className="grid grid-cols-[1fr_max-content] w-full gap-3">
                <Button disabled={loading} type="submit" className="font-bold w-full">
                    {loading ? <Loader /> : "Editar Categoria"}
                </Button>
                <IconBox
                            Icon={MdDelete}
                            variant={"square"}
                            type={"button"}
                            onClick={()=>{
                                setConfirm(true)
                            }}
                        />
                </div>

            </form>

            <Dialog open={success} onOpenChange={(data)=>{
                if (!data) {
                    router.push("/admin/manageCategories")
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

            <Dialog open={confirmDelete} onOpenChange={setConfirm}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>¿Estas seguro de eliminar la categoria?</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>

                    <FormSelect 
                        control={control}
                        name={"categorieID"}
                        rules={{
                            required: {
                                value: true,
                                message: "Este campo es obligatorio"
                            }
                        }}
                        value={getValues("categorieID")}
                        items={FilteredCategories}
                        placeholder={"Seleccione una categoria"}
                        error={formState.errors.categorieID?.message}
                    />

                    </DialogDescription>
                    <DialogFooter>
                        <Button onClick={()=>{
                            setConfirm(false)
                        }}>
                            <p>Cancelar</p>
                        </Button>
                        <Button className={"!bg-red-900 !text-white"} onClick={deleteUser}>
                            <p>Borrar</p>
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>



        </div>
    )
}