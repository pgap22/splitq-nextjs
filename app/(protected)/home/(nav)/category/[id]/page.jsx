import { getCategorieById } from "@/actions/getCategoryById";
import ProductCard from "@/components/ProductCard";
import IconBox from "@/components/ui/IconBox";
import Link from "next/link";
import { redirect } from "next/navigation";
import { MdOutlineArrowBack } from "react-icons/md";

export default async function CategoryPage({ params }) {
  const category = await getCategorieById({id: params.id});
  
  if (!category) return redirect("/home");

  const products = category.productos

  return (
    <>
      <Link href={"/home"}>
        <IconBox variant="square" Icon={MdOutlineArrowBack} />
      </Link>
      <h1 className="font-bold text-2xl mt-4">{category.name}</h1>
      <div className=" mt-4 grid grid-cols-2 gap-4">
        {products.map((item) => (
          <ProductCard product={item} />
        ))}
      </div>
    </>
  );
}

