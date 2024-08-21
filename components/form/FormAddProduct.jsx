"use client"

import { v4 as uuid } from "uuid"

import { useForm } from "react-hook-form"
import FormInput from "./FormInput"
import FormTextArea from "./FormTextArea"
import { Button } from "../ui/button"
import { sumDecimal } from "@/lib/decimal"
import { useState, useTransition } from "react"
import { createProduct } from "@/actions/createProduct"
import AlertWarning from "../ui/AlertWarning"
import Loader from "../Loader"
import { useRouter } from "next/navigation";
import { MdOutlineDelete } from "react-icons/md"
import FormSelect from "./FormSelect"

export default function FormAddProduct({ categories }) {
    const router = useRouter();
    const [warning, setWarning] = useState(false)
    // const [imagesWarning, setImageWarning] = useState();
    // const [images, setImages] = useState([]);
    const { register, handleSubmit, formState, getValues, watch, control, setError, setValue, formState: { errors } } = useForm({
        defaultValues: {
            name: "",
            description: "",
            price: "",
            stock: "",
            categorieID: ""
        }
    });
    const [loading, startTransition] = useTransition();

    const setPrice = (value) => {
        setValue("price", sumDecimal(getValues("price"), value))
    }

    // const handleChange = (e) => {

    //     const newImages = [...images, ...e.target.files].map(img => {
    //         img.id = uuid();
    //         return img
    //     })
        
    //     if (newImages.length > 3) {
    //         setImageWarning("*Maximo 3 imagenes")
    //         return;
    //     }
    //     setImages(newImages)
    // }

    // const deleteImage = (file)=>{
    //     const deleteImage = images.filter(img => img.id !== file.id)
    //     setImages(deleteImage)
    // }

    const creating = (data) => {
        setWarning(false)
        startTransition(async () => {
            // const imageFormData = new FormData();
            
            // images.forEach((img,i) => {
            //     imageFormData.append("file-"+i, img)
            // })

            const result = await createProduct(data);

            if (result?.error) {
                setWarning(result.error)
                return;
            }
            
            router.push("/seller/manageProducts");
        })
    }



    return (
        <>
            <form noValidate onSubmit={handleSubmit(creating)}>
                <div className="p-4 flex flex-col gap-5">
                    <h1 className="text-2xl font-bold">Añadir producto</h1>
                    {warning && <AlertWarning
                        title={"Advertencia"}
                        description={warning}
                    />}
                    <FormInput
                        placeholder={"Nombre del producto"}
                        label={"Nombre del producto"}
                        type={"text"}
                        error={formState.errors.name?.message}
                        register={register("name", { required: { value: true,message: "Nombre esta vacio"} })}
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
                    {/* <div className="flex flex-col">
                        <label htmlFor="images">
                            <p>Imagenes del producto</p>
                            <p className="text-xs font-bold mb-2 text-yellow-500">{imagesWarning}</p>
                            <div className="p-3 select-none cursor-pointer rounded-lg text-sm bg-foreground border border-border text-center font-bold">
                                Subir Imagen
                            </div>
                        </label>
                        <input onChange={handleChange} id="images" type="file" multiple accept="image/png, image/gif, image/jpeg" hidden />
                        {images.map((img) => (
                            <div key={img.id} className="mt-4 grid grid-cols-[1fr_max-content] items-center">
                                <div className="flex gap-2 items-center">
                                    <img className="w-12 h-12 rounded" src={URL.createObjectURL(img)} />
                                    <p className="text-sm font-bold">{img.name}</p>
                                </div>
                                <MdOutlineDelete onClick={()=> deleteImage(img)} size={24} />
                            </div>
                        ))}
                    </div> */}
                    <div className="gap-2 flex flex-col">
                        <p>Precio del producto</p>
                        <div className="grid grid-cols-4 gap-2 mb-2">
                            <PriceButton setPrice={setPrice} value={1}>$1.00</PriceButton>
                            <PriceButton setPrice={setPrice} value={0.25}>$0.25</PriceButton>
                            <PriceButton setPrice={setPrice} value={0.10}>$0.10</PriceButton>
                            <PriceButton setPrice={setPrice} value={0.05}>$0.05</PriceButton>
                        </div>
                        <FormInput
                            register={register("price", {valueAsNumber: true, required: { value: true, message: "Este campo es requerido" } })}
                            type="number"
                            className="bg-foreground mb-2"
                            placeholder="$0"
                            error={errors.price?.message}
                            step={".01"}
                        />
                    </div>
                    <FormInput
                            register={register("stock", {valueAsNumber: true, min: {value: true, message: "Minimo de stock debe ser mayor a 0"}, required: { value: true, message: "Este campo es requerido" } })}
                            type="number"
                            className="bg-foreground mb-2"
                            placeholder="Cantidad de productos disponibles"
                            error={errors.stock?.message}
                            label={"Stock"}
                            step={"1"}
                        />
                    <Button disabled={loading} className="font-bold">
                        {loading ? <Loader /> : "Añadir Producto"}
                    </Button>
                </div>
            </form>
        </>
    )
}

const PriceButton = ({ children, value, setPrice }) => {
    const click = () => {
        setPrice(value)
    }

    return (
        <button type="button" onClick={click} className="border py-0.5 rounded border-gradient text-center">{children}</button>
    )
}