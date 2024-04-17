"use client"
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MdAdd, MdRemove } from "react-icons/md";

const ProductBuy = ({ product }) => {
    const [quantity, setQuantity] = useState(0)
    const handleInput = (e) => {
        const value = +e.target.value;

        if (!/[0-9]/.test(value)) return

        setQuantity(+value)
    }
    return (
        <>
            <div className="flex flex-col gap-2 l fixed bottom-2 left-2 right-2">
                <div className="flex justify-between">
                    <div className="select-none w-fit p-2 gap-2 rounded-md border border-border grid grid-cols-3 justify-center items-center bg-foreground">
                        <MdRemove
                            onClick={() => setQuantity(quantity - 1)}
                            size={24}
                        />
                        <input
                            onInput={handleInput}
                            maxLength={2}
                            value={quantity}
                            className="text-xl outline-none max-w-[2ch] text-center" />

                        <MdAdd
                            onClick={() => setQuantity(quantity + 1)}
                            size={24}
                        />
                    </div>

                    <p className="text-2xl font-bold text-gradient bg-gradient-principal">${product.price}</p>
                </div>
                <Button>Agregar al carrito</Button>
            </div>
        </>
    )
}
export default ProductBuy;
