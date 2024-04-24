"use client"
import { useState } from "react";
import { cn } from "@/lib/utils";
import { MdOutlineLocalOffer } from "react-icons/md";

const ProductView = ({ product }) => {
    const [selectedImages, setSelectedImages] = useState(0)
    return (
        <>
            <div className="relative">
                {(product?.images && product?.images.length) ? <img className="w-full max-h-64 object-cover rounded border border-border" src={product.images[selectedImages].url} />
                    : <div className="w-full h-64 border-b border-border flex items-center justify-center">
                        <MdOutlineLocalOffer size={50} />
                    </div>}

                <div className="left-1/2 flex gap-2 -translate-x-1/2 absolute bottom-4 ">
                    {product.images && product.images.map((prodcutImage, i) => (
                        <div onClick={() => {
                            setSelectedImages(i)
                        }} className={cn("w-6 border border-gradient aspect-square rounded-full bg-foreground", i == selectedImages && "!bg-gradient-principal")}>

                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default ProductView;
