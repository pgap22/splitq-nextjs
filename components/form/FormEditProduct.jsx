"use client"

import { useForm } from "react-hook-form"
import FormInput from "./FormInput"
import FormTextArea from "./FormTextArea"
import FormSelect from "./FormSelect"
import { MdOutlineDelete } from "react-icons/md"
import { useState, useTransition } from "react"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader } from "../ui/dialog"
import { Button } from "../ui/button"
import { DialogDescription } from "@radix-ui/react-dialog"
import deleteProductImage from "@/actions/deleteProductImage"
import Loader from "../Loader"
import { uploadimg } from "@/actions/uploadImg"

export default function FormEditProduct({ product, categories }) {
    const { register, handleSubmit, formState, control, getValues } = useForm({
        defaultValues: {
            name: product.name,
            description: product.description,
            price: product.price,
            categorieID: product.categorieID
        }
    })
    const [openPreviewImage, setOpenPreivewImage] = useState(false);

    const [imgUploadPreview, setimgUploadPreview] = useState()

    const [loadingUpload, startUploading] = useTransition();

    const previewImage = (e) => {
        setimgUploadPreview(e.target.files[0]);
        setOpenPreivewImage(true)
    }

    const uploadImage = () => {


        startUploading(async () => {
            const imgFormData = new FormData();
            imgFormData.set("file", imgUploadPreview)

            const result = await uploadimg(imgFormData, product.id);
            if (result?.error) return

            setOpenPreivewImage(false)
        })
    }

    return (
        <>
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
                    value={getValues("categorieID")}
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
                    <input onChange={previewImage} id="images" type="file" accept="image/png, image/gif, image/jpeg" hidden />
                    {product.images.map((img) => (
                        <ImgPreview key={img.id} img={img} />
                    ))}
                </div>

            </form>
            <Dialog open={openPreviewImage} onOpenChange={setOpenPreivewImage}>
                <DialogContent
                    onInteractOutside={(e) => {
                        e.preventDefault();
                    }}
                >
                    <DialogHeader>
                        Subida de imagen
                    </DialogHeader>
                    <DialogDescription>Deseas subir esta imagen para el producto?</DialogDescription>
                    {imgUploadPreview && <img className="max-w-full rounded aspect-square object-cover" src={URL.createObjectURL(imgUploadPreview)} alt="" />
                    }
                    <Button disabled={loadingUpload} onClick={uploadImage}>{
                        loadingUpload
                            ? <Loader />
                            : "Subir imagen"
                    }</Button>
                    <DialogClose className="w-full">
                        <Button variant="outline" className="w-full">Cerrar</Button>
                    </DialogClose>
                </DialogContent>
            </Dialog>
        </>
    )
}

const ImgPreview = ({ img, utilsEdit = undefined}) => {
    const [open, setOpen] = useState(false)

    const [loadingDelete, startDeleting] = useTransition();

    const handleDelete = (public_id) => {
        
        startDeleting(async () => {
            const result = await deleteProductImage(public_id);
            if (result?.error) {
                return;
            }
            // if(utilsEdit){
            //     utilsEdit.setUploadedImages(utilsEdit.uploadedImages.filter(img => img.public_id !== public_id))
            // }
            setOpen(false)
        })
    }

    return (
        <>
            <div className="mt-4 grid grid-cols-[1fr_max-content] items-center">
                <div className="flex gap-2 items-center">
                    <img className="w-12 h-12  object-cover rounded" src={img.url} />
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
                        <Button onClick={() => handleDelete(img.public_id)} disabled={loadingDelete} className="!bg-danger-action !text-white">{
                            loadingDelete
                                ? <Loader invert />
                                : "Eliminar"
                        }</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}