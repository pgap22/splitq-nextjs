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
import Image from "next/image"
import editProduct from "@/actions/editProduct"
import { useRouter } from "next/navigation"
import IconBox from "../ui/IconBox"
import deleteProduct from "@/actions/deleteProduct"

export default function FormEditProduct({ product, categories }) {
    const { register, handleSubmit, formState, control, getValues, watch } = useForm({
        defaultValues: {
            name: "",
            description: "",
            price: null,
            categorieID: ""
        }
    })
    const router = useRouter();
    const [openPreviewImage, setOpenPreivewImage] = useState(false);
    const [imagesWarning, setImagesWarning] = useState();
    const [imgUploadPreview, setimgUploadPreview] = useState()

    const [confirmDelete, setConfirmDelete] = useState(false)

    const [loadingUpload, startUploading] = useTransition();
    const [loadingDelete, startDeleting] = useTransition();
    const [loadingEdit, startEditing] = useTransition();

    const previewImage = (e) => {
        if (product.images.length >= 3) return setImagesWarning("*Maximo 3 imagenes !")
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

    const submitEditProduct = (data) => {
        for (const prop in data) {
            if (!data[prop]) delete data[prop]
        }

        startEditing(async () => {
            const result = await editProduct(data, product.id);
            if (result?.error) return
            router.push("/seller/manageProducts")
        })
    }

    const submitDeleteProduct = () => {
        startDeleting(async () => {
            const result = await deleteProduct(product.id);
            if (result?.error) return;
            router.push("/seller/manageProducts")

        })
    }

    const isEmpty =
        !watch("name") &&
        !watch("description") &&
        !watch("price") &&
        !watch("categorieID")

    return (
        <>
            <form onSubmit={handleSubmit(submitEditProduct)} noValidate className="flex flex-col gap-4">
                <FormInput
                    placeholder={product.name}
                    label={"Nombre del producto"}
                    type={"text"}
                    error={formState.errors.name?.message}
                    register={register("name")}
                />
                <FormTextArea
                    error={formState.errors.description?.message}
                    placeholder={product.description}
                    label={"Descripcion del producto"}
                    register={register("description")}
                />
                <FormSelect
                    control={control}
                    name={"categorieID"}
                    label="Categoria"
                    value={getValues("categorieID")}
                    items={categories}
                    placeholder={"Seleccione una categoria"}
                    error={formState.errors.categorieID?.message}
                />
                <div className="flex flex-col">
                    <label htmlFor="images">
                        <p>Imagenes del producto</p>
                        <p className="text-xs font-bold mb-2 text-yellow-500">{imagesWarning}</p>
                        <div className="p-3 select-none cursor-pointer rounded-lg text-sm bg-foreground border border-border text-center font-bold">
                            Subir Imagen
                        </div>
                    </label>
                    <input onChange={previewImage} id="images" type="file" accept="image/png, image/gif, image/jpeg" hidden />
                    {product.images.map((img) => (
                        <ImgPreview key={img.id} img={img} />
                    ))}
                </div>
                <div className="gap-2 flex flex-col">
                    <p>Precio del producto</p>
                    <FormInput
                        register={register("price", { valueAsNumber: true, min: { value: 0.1, message: "Cantidad invalida!" } })}
                        type="number"
                        className="bg-foreground mb-2"
                        placeholder={"$" + product.price}
                        error={formState.errors.price?.message}
                        step={".01"}
                        min={0}
                    />
                </div>
                <div className="gap-2 grid grid-cols-[1fr_max-content]">
                    <Button disabled={loadingEdit || isEmpty} className="font-bold">
                        {loadingEdit ? <Loader /> : "Editar Producto"}
                    </Button>
                    <IconBox type="button" onClick={() => setConfirmDelete(true)} variant="square" Icon={MdOutlineDelete} />

                </div>
            </form>
            <Dialog open={openPreviewImage} onOpenChange={(e) => {
                if (loadingUpload) return
                setOpenPreivewImage(e);
            }}>
                <DialogContent
                    onInteractOutside={(e) => {
                        e.preventDefault();
                    }}
                >
                    <DialogHeader>
                        Subida de imagen
                    </DialogHeader>
                    <DialogDescription>Deseas subir esta imagen para el producto?</DialogDescription>
                    {imgUploadPreview && <Image width={200} height={40} className="w-full aspect-square rounded object-cover" src={URL.createObjectURL(imgUploadPreview)} alt="" />
                    }
                    <Button disabled={loadingUpload} onClick={uploadImage}>{
                        loadingUpload
                            ? <Loader />
                            : "Subir imagen"
                    }</Button>
                    <DialogClose asChild disabled={loadingUpload} className="w-full">
                        <Button disabled={loadingUpload} variant="outline" className="w-full">Cerrar</Button>
                    </DialogClose>
                </DialogContent>
            </Dialog>

            <Dialog open={confirmDelete} onOpenChange={(e) => {
                if (loadingDelete) return
                setConfirmDelete(e);
            }}>
                <DialogContent
                    onInteractOutside={(e) => {
                        e.preventDefault();
                    }}
                >
                    <DialogHeader>
                        Eliminar Producto
                    </DialogHeader>
                    <DialogDescription>Deseas subir eliminar este producto?. No podras recuperar la informacion eliminada</DialogDescription>
                    <Button disabled={loadingDelete} onClick={submitDeleteProduct}>{
                        loadingDelete
                            ? <Loader />
                            : "Eliminar Producto"
                    }</Button>
                    <DialogClose asChild disabled={loadingDelete} className="w-full">
                        <Button disabled={loadingDelete} variant="outline" className="w-full">Cerrar</Button>
                    </DialogClose>
                </DialogContent>
            </Dialog>
        </>
    )
}



const ImgPreview = ({ img }) => {
    const [open, setOpen] = useState(false)

    const [loadingDelete, startDeleting] = useTransition();

    const handleDelete = (public_id) => {

        startDeleting(async () => {
            const result = await deleteProductImage(public_id);
            if (result?.error) {
                return;
            }
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

            <Dialog open={open} onOpenChange={(e) => {
                if (loadingDelete) return
                setOpen(e)
            }}>
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