"use client"
import deleteUserCartProducts from "@/actions/deleteUserCartProducts";
import enableItemToBuy from "@/actions/enableItemToBuy";
import modifyQuantityProduct from "@/actions/modifyQuantityProduct";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import { useState, useTransition } from "react";
import { MdAdd, MdOutlineArrowBack, MdOutlineCheck, MdOutlineLocalOffer, MdRemove } from "react-icons/md";


const CartProductCard = ({ item }) => {
    const product = item.product
    const quantities = item.quantity
    const sub = quantities * product.price

    const [load, transition] = useTransition();
    const [editMode, setEditMode] = useState(false);
    function deleteProduct() {
        transition(async () => {
            deleteUserCartProducts(item.id)
        })
    }

    const [loading, startTransition] = useTransition();

    function handleClick(param) {
        startTransition(async () => {
            await modifyQuantityProduct(param, item.id, quantities)
        })
    }

    function toggleEnable(){
       transition(async()=>{
            try {
                await enableItemToBuy(item)
            } catch (error) {
                
            }
       }) 
    }
    return (
        <>
            <div className={cn(load && "opacity-70 -z-10",item.enableToBuy && "bg-white !bg-opacity-item-bg-opacity", "border-b transition-all duration-150 flex py-8 px-4 gap-2 border-border w-full")}>
                <div className="grid grid-cols-[max-content_1fr] gap-2 h-fit">
                    <input onChange={toggleEnable} hidden checked={item.enableToBuy} type="checkbox" className="peer" id={item.id} />
                    <label htmlFor={item.id} className="w-8 peer-checked:bg-text rounded-md aspect-square border flex justify-center items-center self-center border-border">
                        {
                            item.enableToBuy && <MdOutlineCheck className="text-action-text-button" size={20} />
                        }
                    </label>
                    {(product?.images && product?.images.length) ? <img className="max-h border-16 aspect-square object-contain rounded border border-border" src={product.images[0].url} />
                        : <div className="h-20 aspect-square border border-border rounded-md flex items-center justify-center">
                            <MdOutlineLocalOffer size={30} />
                        </div>}
                </div>
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


            <Dialog>
                <DialogHeader>

                </DialogHeader>
                <DialogContent>

                </DialogContent>
            </Dialog>
        </>
    )
}

export default CartProductCard