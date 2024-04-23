"use client"
import { Button } from "@/components/ui/button"
import { useTransition } from "react";


const CartProductButton = () => {
    const [loading, startTransition] = useTransition();

    return (
        <div className="w-full">
            <div className="justify-between flex">
                <p className="font-bold text-2xl">Total: </p>
                <p className="font-bold text-2xl text-gradient bg-gradient-principal">$0.00</p>
            </div>
            <Button disabled={loading} className="w-full min-h-12">
                {loading ? <Loader /> : "Comprar"}
            </Button>
        </div>
    )
}

export default CartProductButton