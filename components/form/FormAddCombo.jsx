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
import IconBox from "../ui/IconBox"
import { MdAdd, MdLineStyle, MdLocalPizza, MdRemove } from "react-icons/md"

export default function FormAddCombo({ categories }) {
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
            <form noValidate onSubmit={handleSubmit()}>
                <div className="p-4 flex flex-col gap-5">
                    <h1 className="text-2xl font-bold">Añadir Combos</h1>
                    {warning && <AlertWarning
                        title={"Advertencia"}
                        description={warning}
                    />}
                    <FormInput
                        placeholder={"Nombre del Combo"}
                        label={"Nombre del Combo"}
                        type={"text"}
                        error={formState.errors.name?.message}
                        register={register("name", { required: { value: true, message: "Nombre esta vacio" } })}
                    />
                    <FormTextArea
                        placeholder={"Escribe acá"}
                        label={"Descripcion del Combo"}
                        register={register("description", { required: { value: true, message: "La descripcion esta vacia" } })}
                    />
                    <Controller
                        name=""
                        rules={{
                            required: {
                                value: true,
                                message: "Este campo es obligatorio"
                            }
                        }}
                        control={control}
                        render={({ field }) => <Select onValueChange={field.onChange}>
                            <SelectTrigger >
                                <SelectValue className="placeholder:text-text-secundary" placeholder="Seleccione los Productos" />
                            </SelectTrigger>
                            <SelectContent className="!bg-foreground">
                                <SelectGroup>
                                    <SelectLabel>Productos</SelectLabel>
                                    {
                                        //categories.map(category => <SelectItem className="!bg-background" value={category.id}>{category.name}</SelectItem>)
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>}

                    />
                    <div className="flex flex-col">
                        <ProductPreview
                            name={"Prueba"}
                            price={"$0.00"}
                        />
                        <ProductPreview
                            name={"Prueba"}
                            price={"$0.00"}
                        />
                    </div>
                    <div className="gap-2 flex flex-col">
                        <p>Precio del combo</p>
                        <div className="grid grid-cols-4 gap-2 mb-2">
                            <PriceButton setPrice={setPrice} value={1}>$1.00</PriceButton>
                            <PriceButton setPrice={setPrice} value={0.25}>$0.25</PriceButton>
                            <PriceButton setPrice={setPrice} value={0.10}>$0.10</PriceButton>
                            <PriceButton setPrice={setPrice} value={0.05}>$0.05</PriceButton>
                        </div>
                        <FormInput
                            register={register("price", { required: { value: true, message: "Este campo es requerido" } })}
                            type="number"
                            className="bg-foreground mb-2"
                            placeholder="$0"
                            error={errors.price?.message}
                            step={".01"}
                        />
                    </div>
                    <Button disabled={loading} className="font-bold">
                        {loading ? <Loader /> : "Añadir Combo"}
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

const ProductPreview = ({ name, price, image, quantity }) => {
    return (
        <div>
            <div className="flex items-center p-4">
                {
                    //aca va la imagen del producto pero pa mientras el icono XD
                }
                <IconBox
                    Icon={MdLocalPizza}
                />
                <div className="flex items-center  justify-between w-full">

                    <div className="flex p-2 flex-col">
                        <p className="font-bold text-sm">{name}</p>
                        <p className="!font-bold !text-lg text-gradient bg-gradient-principal">{price}</p>
                    </div>

                    <div className="flex justify-center items-center bg-foreground">
                        <MdRemove
                            size={30}
                        />
                        <h1 className=" text-xl p-2">1</h1>
                        <MdAdd
                            size={30}
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}