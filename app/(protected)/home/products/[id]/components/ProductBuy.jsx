"use client"
import { useState, useTransition } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MdAdd, MdRemove } from "react-icons/md";
import Loader from "@/components/Loader";
import { createUserCart } from "@/actions/createUserCart";
// import createUserCart from "@/actions/createUserCart";

const ProductBuy = ({ product }) => {
    const [loading, startTransition] = useTransition();


    const [quantity, setQuantity] = useState(1)
    const handleInput = (e) => {
        const value = +e.target.value;

        if (!/[0-9]/.test(value)) return

        setQuantity(+value)
    }

    const modifyQuantity = (action) => {
        if (action == "add") {
            const newQuantity = quantity + 1
            if (newQuantity > 99) return
            setQuantity(newQuantity)
        }
        if (action == "minus") {
            const newQuantity = quantity - 1
            if (newQuantity < 1) return
            setQuantity(newQuantity)
        }
    }

    const submitCart = () => {
        startTransition(async () => {
            const data = {
                id_product: product.id,
                quantity
            }
            await createUserCart(data)
            console.log(data)
        })
    }

    return (
        <>
            <div className="flex flex-col gap-2 l fixed bottom-2 left-2 right-2">
                <div className="flex justify-between">
                    <div className="select-none w-fit p-2 gap-2 rounded-md border border-border grid grid-cols-3 justify-center items-center bg-foreground">
                        <MdRemove
                            onClick={() => modifyQuantity("minus")}
                            size={24}
                        />
                        <input
                            onInput={handleInput}
                            maxLength={2}
                            value={quantity}
                            className="text-xl outline-none max-w-[2ch] text-center" />

                        <MdAdd
                            onClick={() => modifyQuantity("add")}
                            size={24}
                        />
                    </div>

                    <p className="text-2xl font-bold text-gradient bg-gradient-principal">${product.price}</p>
                </div>
                <Button disabled={loading} onClick={submitCart}>
                    {loading ? <Loader /> : "Añadir Producto"}
                </Button>
            </div>
        </>
    )
}
export default ProductBuy;
