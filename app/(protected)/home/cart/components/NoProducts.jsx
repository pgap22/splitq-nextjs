"use client"
import { MdOutlineRemoveShoppingCart } from "react-icons/md"

const NoProducts = () => {
    return (
        <>
            <div className="gap-3 justify-center top-0 bottom-0 flex -z-10 items-center left-0 right-0 absolute p-4">
                <MdOutlineRemoveShoppingCart
                    size={25}
                />
                <p className="text-xl font-bold">Ups.. Nada por aca</p>
            </div>
        </>
    )
}

export default NoProducts