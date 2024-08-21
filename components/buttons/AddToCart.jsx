"use client";
import { useState, useTransition } from "react";
import { Button } from "../ui/button";
import { createUserCart } from "@/actions/createUserCart";
import Loader from "../Loader";
import ControlledModal from "../ControlledModal";
import Link from "next/link";

export default function AddToCart({ product }) {
  const [error, setError] = useState(false)
  const [loading, startAdding] = useTransition();
  const [continueShopping, setContinueShopping] = useState();

  const addCart = () => {
    startAdding(async () => {
      const data = {
        id_product: product.id,
        quantity: 1,
      };
      const typeProduct = !!product.products ? "combo" : "product";
      const result = await createUserCart(data, typeProduct);
      if (result?.error) {
        setError(result.error);
      }

      setContinueShopping(true);
    });
  };

  return (
    <>
      <Button disabled={loading || !product.stock} onClick={addCart} className="w-full mt-4">
        {loading ? <Loader /> : "Añadir al carrito"}
      </Button>
      <ControlledModal
        title={error ? "Insuficinete Stock :(" :"Producto agregado al carrito 🛒"}
        description={error ?  <p>No hay suficiente stock para agregar al carrito <span className="font-bold">{product.name}</span></p> : <p>Se ha agregado exitosamente <span className="font-bold">{product.name}</span></p>}
        open={continueShopping}
        error={error}
        setOpen={setContinueShopping}
        cancelLabel="Continuar comprando"
      >
        <Link href={"/home/cart"}>
          <Button className="w-full">Ir al carrito</Button>
        </Link>
      </ControlledModal>
    </>
  );
}
