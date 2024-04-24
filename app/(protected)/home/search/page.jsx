"use client";

import IconBox from "@/components/ui/IconBox";
import Input from "@/components/ui/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  MdOutlineArrowBack,
  MdOutlineDelete,
  MdOutlineHistory,
} from "react-icons/md";
import { useLocalStorage } from "usehooks-ts";
import { v4 as uuid } from "uuid";

export default function SearchPage() {
  const [value, setValue, remove] = useLocalStorage("search-products", []);
  const [searchedItems, setSearchedItems] = useState([]);
  const router = useRouter();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const searchProducts = ({ search }) => {
    const data = {
      id: uuid(),
      name: search,
    };

    if (!value.some((item) => item.name == search)) {
      setValue((searched) => [...searched, data]);
    }

    router.push("/home/search/"+search)
  };

  useEffect(() => {
    setSearchedItems(value);
  }, [value]);

  return (
    <>
      <main className="p-4">
        <form onSubmit={handleSubmit(searchProducts)} className="flex gap-4">
          <Link href={"/home"}>
            <IconBox
              isButton={false}
              variant={"square"}
              Icon={MdOutlineArrowBack}
            />
          </Link>
          <Input
            {...register("search", { required: true })}
            type="search"
            className="w-full"
            placeholder="Buscar producto"
          />
        </form>
        <h2 className="font-bold text-xl text-text-secundary mt-4">Reciente</h2>
      </main>
      <div className="flex flex-col">
        {searchedItems.map((item) => (
          <SearchItem item={item} />
        ))}
      </div>
    </>
  );
}

const SearchItem = ({ item }) => {
  const [_, setValue, remove] = useLocalStorage("search-products");

  const deleteItem = () => {
    setValue((value) =>
      value.filter((searchItem) => searchItem.id !== item.id)
    );
  };

  return (
    <div className="grid p-4 first:border-t border-b border-border grid-cols-[1fr_max-content] gap-4">
      <Link href={"/home/search/" + item.name}>
        <div className="font-bold flex gap-2 items-center">
          <MdOutlineHistory size={28} />
          <p>{item.name}</p>
        </div>
      </Link>
      <MdOutlineDelete onClick={deleteItem} size={28} />
    </div>
  );
};
