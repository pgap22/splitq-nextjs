"use client"
import deleteUserCartProducts from "@/actions/deleteUserCartProducts";
import modifyQuantityProduct from "@/actions/modifyQuantityProduct";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { useState, useTransition } from "react";
import { MdAdd, MdOutlineArrowBack, MdOutlineLocalOffer, MdRemove } from "react-icons/md";


const CartProductCard = ({ item }) => {
    const product = item.product
    const quantities = item.quantity
    const sub = quantities * product.price

    const [load, transition] = useTransition();

    function deleteProduct() {
        transition(async () => {
            deleteUserCartProducts(item.id)
        })
    }

    const [loading, startTransition] = useTransition();

    function handleClick(param) {
        startTransition(async () => {
            modifyQuantityProduct(param, item.id, quantities)
        })
    }

    return (
        <>
            <div className={clsx(load && "opacity-70 -z-10", "border-b flex p-2 gap-2 border-border w-full")}>
                {(product?.images && product?.images.length) ? <img className="max-h-16 aspect-square object-contain rounded border border-border" src={product.images[0].url} />
                    : <div className="h-16 aspect-square flex items-center justify-center">
                        <MdOutlineLocalOffer size={30} />
                    </div>}
                <div className="flex flex-row justify-between w-full items-center">
                    <div className="flex flex-col">
                        <h1 className="font-bold text-lg">{product.name}</h1>
                        <p className="text-xs text-text-secundary">{product.seller.name}</p>
                        <h1 className="font-bold text-lg text-gradient bg-gradient-principal">${product.price}</h1>
                        <h1 className="font-bold text-xs text-text-secundary mb-2">Subtotal: ${sub}</h1>
                        <p onClick={deleteProduct} className="text-text-secundary text-xs underline">Eliminar</p>
                    </div>
                    <div className="flex justify-between">
                        {
                            loading ? <Loader invert /> :
                                <div className="select-none w-fit p-2 gap-2 rounded-md border border-border grid grid-cols-3 justify-center items-center bg-foreground">
                                    <MdRemove
                                        onClick={() => handleClick("minus")}
                                        size={24}
                                    />
                                    <p className="text-xl outline-none max-w-[2ch] text-center">{quantities}</p>

                                    <MdAdd
                                        onClick={() => handleClick("add")}
                                        size={24}
                                    />
                                </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartProductCard