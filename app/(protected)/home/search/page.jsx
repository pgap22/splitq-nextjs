import { searchProduct } from "@/actions/searchProduct";
import IconBox from "@/components/ui/IconBox";
import Input from "@/components/ui/Input";
import SearchedItems from "@/containers/SearchedItems";
import Link from "next/link";
import { MdOutlineArrowBack } from "react-icons/md";

export default function SearchPage() {

  return (
    <>
      <main className="p-4">
        <form action={searchProduct} className="flex gap-4">
          <Link href={"/home"}>
            <IconBox
              isButton={false}
              variant={"square"}
              Icon={MdOutlineArrowBack}
            />
          </Link>
          <Input
            type="search"
            className="w-full"
            name="query"
            placeholder="Buscar producto"
          />
        </form>
        <h2 className="font-bold text-xl text-text-secundary mt-4">Reciente</h2>
      </main>
      <SearchedItems />
    </>
  );
}

