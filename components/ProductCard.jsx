import Link from "next/link";
import { MdOutlineLocalOffer } from "react-icons/md";
import AddToCart from "./buttons/AddToCart";

export default function ProductCard({ product }) {
  return (
    <div className="border border-border rounded bg-foreground">
      <div className="flex flex-col h-full">
        <Link href={"/home/products/" + product.id}>
          {product?.images && product?.images.length ? (
            <img
              className="object-contain w-full aspect-square rounded-t border-b border-border"
              src={product.images[0].url}
            />
          ) : (
            <div className="flex aspect-square border-b border-border items-center justify-center">
              <MdOutlineLocalOffer size={50} />
            </div>
          )}
        </Link>

        <div className="flex-col justify-between h-full p-2 flex">
          <Link href={"/home/products/" + product.id}>
            <p className="font-bold">{product.name}</p>

            {/* <p className="truncate max-w-[20ch]">{product.description}</p> */}
            <p className="font-bold text-xl text-gradient-principal text-gradient bg-gradient-principal">
              ${product.price}
            </p>
          </Link>
          <AddToCart product={product} className="w-full mt-4">
            Añadir al carrito
          </AddToCart>
        </div>
      </div>
    </div>
  );
}
