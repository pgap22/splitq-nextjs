"use client"

import { Button } from "@/components/ui/button"

export default function RefoundsActions() {
    return(
        <>
            <div className="fixed flex flex-col gap-2 bottom-4 left-4 right-4">
                <Button>Aceptar Rembolso</Button>
                <Button className="!bg-danger-action !text-white">Cancelar Rembolso</Button>
            </div>
        </>
    )
}