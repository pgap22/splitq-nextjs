"use client"

import { useForm } from "react-hook-form"
import { Select, SelectTrigger, SelectContent, SelectGroup, SelectValue, SelectItem } from "../ui/select"
import FormInput from "./FormInput"
import FormTextArea from "./FormTextArea"
import { Button } from "../ui/button"
import Loader from "../Loader"
import IconBox from "../ui/IconBox"
import { MdAdd, MdLocalPizza, MdRemove } from "react-icons/md"
import { multiplyDecimal, sumDecimal } from "@/lib/decimal"
import { useEffect, useState, useTransition } from "react"


export default function FormAddCombo({ productos }) {
    const [loading, startTransition] = useTransition();
    const [comboOpen, setComboOpen] = useState();
    const [value, setValueCombo] = useState();

    const [addedProducts, setAddedProducts] = useState([]);
    const { register, handleSubmit, formState, getValues, control, setValue, formState: { errors } } = useForm({
        defaultValues: {
            name: "",
            description: "",
            price: "",
            products: []
        }
    });



    const modifyQuantityProduct = (action, data) => {
        const products = addedProducts.map(
            product => {
                if (data.id === product.id) {
                    const quantity = action == "add" ? product.quantity + 1 : product.quantity - 1

                    if(quantity == 0) return null   

                    return {
                        ...product,
                        quantity
                    }
                }
                return product
            }
        )
        setAddedProducts(products.filter(product => product))
    }

    const addProductToCombo = () => {

    }

    const setPrice = (value) => {
        setValue("price", sumDecimal(getValues("price"), value))
    }

    const submitData = (data) => {
        console.log(data)
    }

    useEffect(()=>{
        setValue("price", sumDecimal(1,1,1))
    },[addedProducts])


    return (
        <>
            <form noValidate onSubmit={handleSubmit(submitData)}>
                <div className="p-4 flex flex-col gap-5">
                    <h1 className="text-2xl font-bold">Añadir Combos</h1>
                    {/* {warning && <AlertWarning
                        title={"Advertencia"}
                        description={warning}
                    />} */}
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
                    <Select value="" onValueChange={(id_product) => {
                        const foundProduct = productos.find(product => product.id == id_product);


                        const sameProduct = addedProducts.find(product => product.id == id_product)
                        
                        if (sameProduct) {
                            const modifiedQuantity = addedProducts.map(product => {
                                if (product.id == id_product) {
                                    return {
                                        ...product,
                                        quantity: product.quantity + 1
                                    }
                                }
                                return product
                            })
                            setAddedProducts(modifiedQuantity)
                            return
                        }

                        setAddedProducts([...addedProducts, {
                            ...foundProduct,
                            quantity: 1
                        }])
                    }}>
                        <SelectTrigger className="!text-white">
                            <SelectValue placeholder="Agrega Productos a Tu Combo" />
                        </SelectTrigger>
                        <SelectContent className="!bg-foreground">
                            <SelectGroup>
                                {
                                    productos.map(producto => <SelectItem key={producto.id} className="!bg-background" value={producto.id} >{producto.name}</SelectItem>)
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <div className="flex flex-col">
                        {/* <ProductPreview
                            name={"Prueba"}
                            price={"$0.00"}
                        />
                        <ProductPreview
                            name={"Prueba"}
                            price={"$0.00"}
                        /> */}
                        {
                            addedProducts.map(addedProduct => (
                                <ProductPreview
                                    key={addedProduct.id}
                                    product={addedProduct}
                                    modifyQuantityProduct={modifyQuantityProduct}
                                />))
                        }
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

const ProductPreview = ({ product, modifyQuantityProduct }) => {
    return (
        <div>
            <div className="flex items-center p-4">
                {
                    //aca va la imagen del producto pero pa mientras el icono XD
                }
                <IconBox
                    isButton={false}
                    Icon={MdLocalPizza}
                />
                <div className="flex items-center  justify-between w-full">

                    <div className="flex p-2 flex-col">
                        <p className="font-bold text-sm">{product.name}</p>
                        <p className="!font-bold !text-lg text-gradient bg-gradient-principal">${multiplyDecimal(product.price,product.quantity)}</p>
                    </div>

                    <div className="flex justify-center items-center bg-foreground">
                        <MdRemove
                            onClick={() => modifyQuantityProduct("minus", product)}
                            size={30}
                        />
                        <h1 className=" text-xl p-2">{product.quantity}</h1>
                        <MdAdd
                            onClick={() => modifyQuantityProduct("add", product)}
                            size={30}
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}