import { getProductsQuery } from "@/actions/getProductsQuery";
import IconBox from "@/components/ui/IconBox";
import Link from "next/link";
import { MdOutlineArrowBack, MdOutlineLocalOffer } from "react-icons/md";

export default async function SearchedPageResults({ params }) {
  const products = await getProductsQuery({
    name: {
      contains: params.query,
      mode: 'insensitive', // Default value: default
    },
  })

  return (
    <>
      <div className="max-w-fit">
        <Link href={"/home"}>
          <IconBox variant="square" Icon={MdOutlineArrowBack} />
        </Link>
      </div>
      <h1 className="font-bold text-2xl mt-4">Resultados de "{params.query}"</h1>
      <div className=" mt-4 grid grid-cols-2 gap-4">
        {products.map((item) => (
          <ProductCard product={item} />
        ))}
      </div>
    </>
  );
}

const ProductCard = ({ product }) => {
  return (
    <Link href={"/home/products/" + product.id}>
      <div className="border border-border rounded bg-foreground">
        <div className="flex flex-col">
          {(product?.images && product.images.length) ? (
            <img
              className="object-cover aspect-square rounded"
              src={product.images[0].url}
            />
          ) : (
            <div className="flex aspect-square items-center justify-center">
              <MdOutlineLocalOffer size={50} />
            </div>
          )}
          <div className="max-w-full p-2">
            <p className="font-bold">{product.name}</p>
            <p className="truncate max-w-[20ch]">{product.description}</p>
            <p className="font-bold text-gradient-principal text-gradient bg-gradient-principal">
              ${product.price}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};
