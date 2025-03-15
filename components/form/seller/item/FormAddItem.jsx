"use client"

import { useForm } from "react-hook-form"
import FormInput from "@/components/form/FormInput"
import FormTextArea from "@/components/form/FormTextArea"
import { Button } from "@/components/ui/button"
import Loader from "@/components/Loader"
import IconBox from "@/components/ui/IconBox"
import { MdAdd, MdLocalPizza, MdRemove } from "react-icons/md"
import { multiplyDecimal, sumDecimal } from "@/lib/decimal"
import { useEffect, useState, useTransition } from "react"
import AlertWarning from "@/components/ui/AlertWarning"
import { useRouter } from "next/navigation"
import FormSelect from "../../FormSelect"
import AlertInfo from "@/components/ui/AlertInfo"
import { createItem } from "@/actions/seller/items/createItem"


export default function FormAddItem({ productos, categories }) {
    const [loading, startTransition] = useTransition();
    const [priceTotal, setPriceTotal] = useState(0);
    const [error, setError] = useState();
    const router = useRouter();
    const [addedProducts, setAddedProducts] = useState([]);
    const { register, handleSubmit, formState, watch, control, setValue, formState: { errors } } = useForm({
        defaultValues: {
            name: "",
            description: "",
            price: "",
            stock: null,
            item_type: "PRODUCT",
            itemAdd: "",
            id_category: ""
        }
    });

    const item_type = watch("item_type")
    const itemAdd = watch("itemAdd");


    const submitCombo = (data) => {
        startTransition(async () => {

            const products = addedProducts.map(product => ({
                id: product.id,
                quantity: product.quantity
            }))

            const result = await createItem(data, products);

            if (result.error) {
                setError(result.error)
                return;
            }

            const redirectPage = item_type == "COMBO" ? 'combos' : 'productos';
            router.push(`/seller/manageItems?q=${redirectPage}`);
        })
    }

    const modifyQuantityProduct = (action, data, value) => {
        const products = addedProducts.map(
            product => {
                if (data.id === product.id) {
                    let quantity = product.quantity;

                    if (action == "add") {
                        ++quantity
                    }
                    if (action == "minus") {
                        --quantity
                    }


                    if (action != "value" && quantity <= 0) return null
                    if (action == "value" && value < 0) return null

                    if (quantity > 99) return product;
                    return {
                        ...product,
                        quantity: action == "value" ? value : quantity
                    }
                }
                return product
            }
        )
        setAddedProducts(products.filter(product => product))
    }

    const addProductToCombo = (id_product) => {
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
    }

    useEffect(() => {
        if (!itemAdd) return;
        addProductToCombo(itemAdd);
        setValue("itemAdd", "")
    }, [itemAdd])

    useEffect(() => {
        if (!addedProducts.length) {
            setPriceTotal(0)
            setValue("price", "")
            return;
        };
        const currentPriceTotal = sumDecimal(...addedProducts.map(product => {
            return multiplyDecimal(product.price, product.quantity)
        }))
        setPriceTotal(currentPriceTotal)
        setValue("price", currentPriceTotal)
    }, [addedProducts])


    return (
        <>
            <form noValidate onSubmit={handleSubmit(submitCombo)}>
                <div className="p-4 flex flex-col gap-5">
                    <h1 className="text-2xl font-bold">Añadir Item</h1>

                    <FormInput
                        placeholder={"Nombre del Item"}
                        label={"Nombre del Item"}
                        type={"text"}
                        error={formState.errors.name?.message}
                        register={register("name", { required: { value: true, message: "Nombre esta vacio" } })}
                    />
                    <FormTextArea
                        placeholder={"Escribe acá"}
                        label={"Descripcion del Item"}
                        error={formState.errors.description?.message}
                        register={register("description")}
                    />

                    <FormSelect
                        control={control}
                        label={"Tipo Item"}
                        name={"item_type"}
                        items={[
                            { id: 'PRODUCT', name: "Producto" },
                            { id: 'COMBO', name: "Combo" },
                        ]}
                    />

                    {
                        item_type == "COMBO" ? (
                            <FormSelect
                                label={"Agregar items a tu combo"}
                                name={'itemAdd'}
                                placeholder={"Agrega items a tu combo"}
                                control={control}
                                items={productos}
                            />
                        ) : (
                            <FormSelect
                                label={"Categoria del item"}
                                name={'id_category'}
                                placeholder={"Selecciona una categoria"}
                                control={control}
                                items={categories}
                            />
                        )
                    }

                    {
                        item_type == "COMBO" && (
                            <div className="flex flex-col">
                                {
                                    addedProducts.map(addedProduct => (
                                        <ProductPreview
                                            key={addedProduct.id}
                                            product={addedProduct}
                                            modifyQuantityProduct={modifyQuantityProduct}
                                        />))
                                }
                            </div>
                        )
                    }

                    <div className="gap-4 flex flex-col">
                        <p>Precio del Item {
                            item_type == "COMBO" && <span className="bg-foreground border border-border p-2 text-text-secundary">Recomendado ${priceTotal}</span>
                        }</p>

                        <FormInput
                            register={register("price", { valueAsNumber: true, required: { value: true, message: "Este campo es requerido" } })}
                            type="number"
                            className="bg-foreground mb-2"
                            placeholder="$0"
                            error={errors.price?.message}
                            step={".01"}
                        />
                    </div>
                    {
                        item_type == "PRODUCT" ? (
                            <FormInput
                                register={register("stock", { valueAsNumber: true, min: { value: true, message: "Minimo de stock debe ser mayor a 0" }, required: { value: true, message: "Este campo es requerido" } })}
                                type="number"
                                className="bg-foreground mb-2"
                                placeholder="Cantidad de productos disponibles"
                                error={errors.stock?.message}
                                label={"Stock"}
                                step={"1"}
                            />
                        ) : <AlertInfo title={"Alerta"} description={"El stock de los combos se determinara dependiendo del stock de los productos que incluye !"} />
                    }
                    {error && <AlertWarning
                        title={"Advertencia"}
                        description={error}
                    />}
                    <Button disabled={loading} className="font-bold">
                        {loading ? <Loader /> : "Añadir Combo"}
                    </Button>
                </div>
            </form>
        </>
    )
}



const ProductPreview = ({ product, modifyQuantityProduct }) => {

    const handleInput = (e) => {
        const value = +e.target.value;

        if (!/[0-9]/.test(value)) return

        modifyQuantityProduct("value", product, +value)
    }

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
                        <p className="!font-bold !text-lg text-gradient bg-gradient-principal">${multiplyDecimal(product.price, product.quantity)}</p>
                        <p className="text-xs text-text-secundary font-bold">${product.price} x{product.quantity}</p>
                    </div>

                    <div className="select-none p-2 gap-2 rounded-md border border-border grid grid-cols-3 justify-center items-center bg-foreground">
                        <MdRemove
                            onClick={() => modifyQuantityProduct("minus", product)}
                            size={24}
                        />
                        <input onInput={handleInput} maxLength={2} value={+product.quantity} className="text-xl outline-none max-w-[2ch] text-center" />
                        <MdAdd
                            onClick={() => modifyQuantityProduct("add", product)}
                            size={24}
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}