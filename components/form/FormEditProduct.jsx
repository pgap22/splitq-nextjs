"use client"

import { useForm } from "react-hook-form"
import FormInput from "./FormInput"
import FormTextArea from "./FormTextArea"
import FormSelect from "./FormSelect"
import { MdOutlineDelete } from "react-icons/md"
import { useState } from "react"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader } from "../ui/dialog"
import { Button } from "../ui/button"
import { DialogDescription } from "@radix-ui/react-dialog"

export default function FormEditProduct({ product, categories }) {
    const { register, handleSubmit, formState, control, getValues } = useForm({
        defaultValues: {
            name: product.name,
            description: product.description,
            price: product.price,
            categorieID: product.categorieID
        }
    })


    console.log(product)
    return (
        <form noValidate>
            <FormInput
                placeholder={"Nombre del producto"}
                label={"Nombre del producto"}
                type={"text"}
                error={formState.errors.name?.message}
                register={register("name", { required: { value: true, message: "Nombre esta vacio" } })}
            />
            <FormTextArea
                error={formState.errors.description?.message}
                placeholder={"Escribe acá"}
                label={"Descripcion del producto"}
                register={register("description", { required: { value: true, message: "La descripcion esta vacia" } })}
            />
            <FormSelect
                control={control}
                name={"categorieID"}
                rules={{
                    required: {
                        value: true,
                        message: "Este campo es obligatorio"
                    }
                }}
                defaultValues={getValues("categorieID")}
                items={categories}
                placeholder={"Seleccione una categoria"}
                error={formState.errors.categorieID?.message}
            />
            <div className="flex flex-col">
                <label htmlFor="images">
                    <p>Imagenes del producto</p>
                    {/* <p className="text-xs font-bold mb-2 text-yellow-500">{imagesWarning}</p> */}
                    <div className="p-3 select-none cursor-pointer rounded-lg text-sm bg-foreground border border-border text-center font-bold">
                        Subir Imagen
                    </div>
                </label>
                <input id="images" type="file" multiple accept="image/png, image/gif, image/jpeg" hidden />
                {product.images.map((img) => (
                    <ImgPreview img={img} />
                ))}
            </div>

        </form>
    )
}

const ImgPreview = ({ img }) => {
    const [open, setOpen] = useState(false)
    return (
        <>
            <div className="mt-4 grid grid-cols-[1fr_max-content] items-center">
                <div className="flex gap-2 items-center">
                    <img className="w-12 h-12 rounded" src={img.url} />
                    <p className="text-sm max-w-[30ch] truncate font-bold">{img.url.split("/")[img.url.split("/").length - 1]}</p>
                </div>
                <MdOutlineDelete onClick={() => setOpen(true)} size={24} />
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent
                    onInteractOutside={(e) => {
                        e.preventDefault();
                    }}
                >
                    <DialogHeader>
                        Estas seguro de eliminar esta imagen ?
                    </DialogHeader>
                    <DialogDescription>
                        Esta accion no se puede deshacer, la imagen se perdera !
                    </DialogDescription>
                    <DialogFooter className={"flex gap-2"}>
                        <Button className="!bg-danger-action !text-white">Eliminar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}