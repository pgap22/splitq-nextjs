"use client"

import { useForm } from "react-hook-form"
import { Select, SelectTrigger, SelectContent, SelectGroup, SelectValue, SelectItem } from "../ui/select"
import FormInput from "./FormInput"
import FormTextArea from "./FormTextArea"
import { Button } from "../ui/button"
import Loader from "../Loader"
import IconBox from "../ui/IconBox"
import { MdAdd, MdLocalPizza, MdOutlineArrowBack, MdOutlineDelete, MdRemove } from "react-icons/md"
import { multiplyDecimal, sumDecimal } from "@/lib/decimal"
import { useEffect, useState, useTransition } from "react"
import AlertWarning from "../ui/AlertWarning"
import { useRouter } from "next/navigation"
import { editCombo } from "@/actions/editCombo"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import deleteCombo from "@/actions/deleteCombo"
import { objDiff } from "@/lib/objDiff"

export default function FormEditCombo({ productos, combo }) {
    const [loading, startTransition] = useTransition();
    const [priceTotal, setPriceTotal] = useState(0);
    const [error, setError] = useState();
    const router = useRouter();
    const [addedProducts, setAddedProducts] = useState([]);
    const [initProducts, setInitProducts] = useState([]);
    const { register, handleSubmit, formState, getValues, control, watch, setValue, formState: { errors } } = useForm({
        defaultValues: {
            name: "",
            description: "",
            price: "",
        }
    });

    const submitCombo = (data) => {
        startTransition(async () => {

            for (const prop in data) {
                if (!data[prop]) delete data[prop]
            }


            const products = addedProducts.map(product => ({
                id: product.id,
                quantity: product.quantity
            }))
            const resultCombo = await editCombo(data, products, combo.id);

            if (resultCombo.error) {
                setError(resultCombo.error)
                return;
            }

            router.push("/seller/manageProducts?q=combos");
        })
    }

    const handleDelete = () => {
        startTransition(async () => {
            const result = await deleteCombo(combo.id);
            if (result?.error) {
                setError(result.error);
                return
            }
            router.push("/seller/manageProducts?q=combos")
        })
    }


    const isEmpty =
        !watch("name") &&
        !watch("description") &&
        !watch("stock") &&
        !watch("price") &&
        objDiff(addedProducts, initProducts)


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
        if (!combo.products.length) return

        if (!addedProducts.length) {
            setInitProducts(combo.products.map(item => ({ ...item, ...item.product })))
            setAddedProducts(combo.products.map(item => ({ ...item, ...item.product })));
            return
        }
        const currentPriceTotal = sumDecimal(...addedProducts.map(product => {
            return multiplyDecimal(product.price, product.quantity)
        }))
        setPriceTotal(currentPriceTotal)
        // setValue("price", currentPriceTotal)
    }, [addedProducts])


    return (
        <>
            <form noValidate onSubmit={handleSubmit(submitCombo)}>
                <div className="p-4 flex flex-col gap-5">
                    <h1 className="text-2xl font-bold">Editar Combos</h1>
                    {error && <AlertWarning
                        title={"Advertencia"}
                        description={error}
                    />}
                    <FormInput
                        placeholder={combo.name}
                        label={"Nombre del Combo"}
                        type={"text"}
                        error={formState.errors.name?.message}
                        register={register("name")}
                    />
                    <FormTextArea
                        placeholder={combo.description}
                        label={"Descripcion del Combo"}
                        register={register("description")}
                    />

                    <Select value="" onValueChange={addProductToCombo}>
                        <SelectTrigger className="!text-white hidden md:flex">
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
                    <select value={""} onChange={(e) => addProductToCombo(e.target.value)} className="flex md:hidden !ring-offset-0 !ring-0 p-4 border-border bg-foreground  w-full items-center justify-between rounded-md border   text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1  dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus:ring-slate-300">
                        <option value="" disabled>Agregar productos a tu combo</option>
                        {
                            productos.map(producto => <option key={producto.id} className="!bg-background" value={producto.id} >{producto.name}</option>)
                        }
                    </select>

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
                    <div className="gap-4 flex flex-col">
                        <p>Precio del combo <span className="bg-foreground border border-border p-2 text-text-secundary">Recomendado ${priceTotal}</span></p>

                        <FormInput
                            register={register("price", { valueAsNumber: true })}
                            type="number"
                            className="bg-foreground mb-2"
                            placeholder={"$" + combo.price}
                            error={errors.price?.message}
                            step={".01"}
                        />
                    </div>
                    <FormInput
                        register={register("stock", { valueAsNumber: true, min: { value: true, message: "Minimo de stock debe ser mayor a 0" } })}
                        type="number"
                        className="bg-foreground mb-2"
                        placeholder={combo.stock}
                        error={errors.stock?.message}
                        label={"Stock"}
                        step={"1"}
                    />
                    <div className="grid grid-cols-[1fr_max-content] gap-2">
                        <Button disabled={loading || isEmpty} className="font-bold">
                            {loading ? <Loader /> : "Editar Combo"}
                        </Button>
                        <Dialog>
                            <DialogTrigger asChild>
                                <IconBox variant="square" Icon={MdOutlineDelete} />
                            </DialogTrigger>
                            <DialogContent onInteractOutside={(e) => {
                                e.preventDefault();
                            }}>
                                <DialogHeader>
                                    <DialogTitle>Estas seguro de eliminar este combo?</DialogTitle>
                                    <DialogDescription>
                                        Si eliminas este combo, no podras recuperarlo !
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter className={"flex flex-col gap-2 md:gap-0"}>
                                    <Button disabled={loading} onClick={handleDelete}>
                                        {
                                            loading
                                                ? <Loader />
                                                : "Eliminar"
                                        }
                                    </Button>
                                    <DialogClose disabled={loading} asChild>
                                        <Button variant="outline">Cerrar</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
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