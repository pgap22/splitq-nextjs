import { getProductsQuery } from "@/actions/getProductsQuery";
import ProductCard from "@/components/ProductCard";
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
      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((item) => (
          <ProductCard product={item} />
        ))}
      </div>
    </>
  );
}

