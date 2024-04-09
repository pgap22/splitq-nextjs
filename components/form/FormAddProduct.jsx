"use client"

import { Controller, useForm } from "react-hook-form"
import { Select, SelectTrigger, SelectItem, SelectContent, SelectGroup, SelectLabel, SelectValue } from "../ui/select"
import FormInput from "./FormInput"
import FormTextArea from "./FormTextArea"
import { Button } from "../ui/button"
import { sumDecimal } from "@/lib/decimal"
import { useState, useTransition } from "react"
import { createProduct } from "@/actions/createProduct"
import AlertWarning from "../ui/AlertWarning"
import Loader from "../Loader"
import { useRouter } from "next/navigation";

export default function FormAddProduct({ categories }) {
    const router = useRouter();
    const [warning, setWarning] = useState(false)
    const { register, handleSubmit, formState, getValues, control, setValue, formState: { errors } } = useForm();
    const [loading, startTransition] = useTransition();
    
    const setPrice = (value) => {
        setValue("price", sumDecimal(getValues("price"), value))
    }
    
    const creating = (data) => {
        setWarning(false)
        startTransition(async () => {
            const result = await createProduct(data);
            if (result) {
                setWarning(result.error)
            }
            router.push("/seller");
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
                        register={register("name", { required: { value: true, message: "Nombre esta vacio" } })}
                    />
                    <FormTextArea
                        placeholder={"Escribe acá"}
                        label={"Descripcion del producto"}
                        register={register("description", { required: { value: true, message: "La descripcion esta vacia" } })}
                    />
                    <Controller
                        name="categorieID"
                        rules={{
                            required: {
                                value: true,
                                message: "Este campo es obligatorio"
                            }
                        }}
                        control={control}
                        render={({ field }) => <Select onValueChange={field.onChange}>
                            <SelectTrigger >
                                <SelectValue className="placeholder:text-text-secundary" placeholder="Seleccione el rol" />
                            </SelectTrigger>
                            <SelectContent className="!bg-foreground">
                                <SelectGroup>
                                    <SelectLabel>Categoria</SelectLabel>
                                    {
                                        categories.map(category => <SelectItem key={category.id} className="!bg-background" value={category.id}>{category.name}</SelectItem>)
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>}

                    />
                    <div className="flex flex-col">
                        <label htmlFor="xd">
                            <p>Imagenes del producto</p>
                            <div className="p-3 rounded-lg text-sm bg-foreground border border-border text-center font-bold">
                                Subir Imagen
                            </div>
                        </label>
                        <input type="file" hidden id="xd" />
                    </div>
                    <div className="gap-2 flex flex-col">
                        <p>Precio del producto</p>
                        <div className="grid grid-cols-4 gap-2 mb-2">
                            <PriceButton setPrice={setPrice} value={1}>$1.00</PriceButton>
                            <PriceButton setPrice={setPrice} value={0.25}>$0.25</PriceButton>
                            <PriceButton setPrice={setPrice} value={0.10}>$0.10</PriceButton>
                            <PriceButton setPrice={setPrice} value={0.05}>$0.05</PriceButton>
                        </div>
                        <FormInput
                            register={register("price", {required: { value: true, message: "Este campo es requerido" } })}
                            type="number"
                            className="bg-foreground mb-2"
                            placeholder="$0"
                            error={errors.price?.message}
                            step={".01"}
                        />
                    </div>
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