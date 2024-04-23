"use client"
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { MdAdd, MdOutlineArrowBack, MdOutlineLocalOffer, MdRemove } from "react-icons/md";


const CartProductCard = ({ item }) => {
    const product = item.product
    const quantity = item.quantity
    
    const [loading, startTransition] = useTransition();
    const [quantities, setQuantity] = useState(quantity);

    const handleInput = (e) => {
        const value = +e.target.value;

        if (!/[0-9]/.test(value)) return

        setQuantity(+value)
    }

    const modifyQuantity = (action) => {
        if (action == "add") {
            const newQuantity = quantities + 1
            if (newQuantity > 99) return
            setQuantity(newQuantity)
        }
        if (action == "minus") {
            const newQuantity = quantities - 1
            if (newQuantity < 1) return
            setQuantity(newQuantity)
        }
    }

    return (
        <>
            <div className="border-b flex p-2 gap-2 border-border w-full">
                {product.images.length ? <img className="max-h-16 aspect-square object-cover rounded border border-border" src={product.images[0].url} />
                    : <div className="w-full h-64 border-b border-border flex items-center justify-center">
                        <MdOutlineLocalOffer size={50} />
                    </div>}
                <div className="flex flex-row justify-between w-full items-center">
                    <div className="flex flex-col">
                        <h1 className="font-bold text-lg">{product.name}</h1>
                        <p className="text-xs text-text-secundary">{product.seller.name}</p>
                        <h1 className="font-bold text-lg text-gradient bg-gradient-principal">${product.price}</h1>
                    </div>
                    <div className="flex justify-between">
                        <div className="select-none w-fit p-2 gap-2 rounded-md border border-border grid grid-cols-3 justify-center items-center bg-foreground">
                            <MdRemove
                                onClick={() => modifyQuantity("minus")}
                                size={24}
                            />
                            <input
                                onInput={handleInput}
                                maxLength={2}
                                value={quantities}
                                className="text-xl outline-none max-w-[2ch] text-center" />

                            <MdAdd
                                onClick={() => modifyQuantity("add")}
                                size={24}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartProductCard