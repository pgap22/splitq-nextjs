"use client"
import { Button } from "@/components/ui/button"
import { useTransition } from "react";


const CartProductButton = ({total}) => {
    const [loading, startTransition] = useTransition();

    return (
        <div className="fixed bottom-0 left-0 right-0 p-4">
            <div className="justify-between flex">
                <p className="font-bold text-2xl">Total: </p>
                <p className="font-bold text-2xl text-gradient bg-gradient-principal">${total}</p>
            </div>
            <Button disabled={loading} className="w-full min-h-12">
                {loading ? <Loader /> : "Comprar"}
            </Button>
        </div>
    )
}

export default CartProductButton