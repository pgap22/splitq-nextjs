"use client"
import { useState } from "react";
import { cn } from "@/lib/utils";

const ProductView = ({ product }) => {
    const [selectedImages, setSelectedImages] = useState(0)
    return (
        <div className="relative">
            {product.images.length ? <img className="w-full absolute max-h-64 object-cover rounded border border-border" src={product.images[selectedImages].url} />
                : <div className="w-20 h-20 flex items-center justify-center">
                    <MdOutlineLocalOffer size={30} />
                </div>}

            <div className="left-1/2 flex gap-2 -translate-x-1/2 absolute ">
                {product.images.map((prodcutImage, i) => (
                    <div onClick={() => {
                        setSelectedImages(i)
                    }} className={cn("w-6 border border-gradient aspect-square rounded-full bg-foreground", i == selectedImages && "!bg-gradient-principal")}>

                    </div>
                ))}
            </div>
        </div>
    )
}
export default ProductView;
