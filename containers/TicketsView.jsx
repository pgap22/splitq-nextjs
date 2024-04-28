"use client"

import { IconTabs } from "@/components/icon-tabs";
import { MdOutlineCheckCircle, MdOutlineLocalActivity } from "react-icons/md";

export default function TicketsView({tickets}){
    return(
        <>
          <div className="grid grid-cols-2 border-b border-border mb-4">
                <IconTabs label={"Disponibles"} Icon={MdOutlineLocalActivity} type={"enable"} />
                <IconTabs label={"Canjeados"} Icon={MdOutlineCheckCircle} type={"claimed"} />
            </div>
        </>
    )
}

const CardProduct = ({ product }) => {
    return (
      <div className="border-b last:border-none flex p-2 gap-2 border-border w-full">
        {product?.images && product?.images.length ? (
          <img
            className="max-h-16 aspect-square object-cover rounded border border-border"
            src={product.images[0].url}
          />
        ) : (
          <div className="h-16 aspect-square border border-border flex items-center justify-center">
            <MdOutlineLocalOffer size={30} />
          </div>
        )}
        <div className="flex flex-row justify-between w-full items-center">
          <div className="flex flex-col">
            <h1 className="font-bold text-lg">{product.name}</h1>
            <p className="text-xs text-text-secundary">{product.seller.name}</p>
          </div>
        </div>
      </div>
    );
  };
  