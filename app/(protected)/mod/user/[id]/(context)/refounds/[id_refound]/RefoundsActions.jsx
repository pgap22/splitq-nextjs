"use client"

import { Button } from "@/components/ui/button"
import { multiplyDecimal } from "@/lib/decimal"

export default function RefoundsActions() {
    console.log([].map(item => multiplyDecimal(item.quantity, item.product.price)))
    return(
        <>
            <div className="fixed flex flex-col gap-2 bottom-4 left-4 right-4">
                <Button>Aceptar Rembolso</Button>
                <Button className="!bg-danger-action !text-white">Cancelar Rembolso</Button>
            </div>
        </>
    )
}