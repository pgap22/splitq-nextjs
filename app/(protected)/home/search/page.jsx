import FormSearch from "@/components/form/FormSearch";
import IconBox from "@/components/ui/IconBox";
import SearchedItems from "@/containers/SearchedItems";
import Link from "next/link";
import { MdOutlineArrowBack } from "react-icons/md";

export default function SearchPage() {
  return (
    <>
      <main className="p-4">
        <div className="flex gap-4">
          <Link href={"/home"}>
            <IconBox
              isButton={false}
              variant={"square"}
              Icon={MdOutlineArrowBack}
            />
          </Link>
          <FormSearch />
        </div>
        <h2 className="font-bold text-xl text-text-secundary mt-4">Reciente</h2>
      </main>
      <SearchedItems />
    </>
  );
}
