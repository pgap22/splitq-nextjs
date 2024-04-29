"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdOutlineDelete, MdOutlineHistory } from "react-icons/md";
import { useLocalStorage } from "usehooks-ts";

export default function SearchedItems() {
  const [items] = useLocalStorage("searched-products", []);
  const [searchedItems, setSearched] = useState([]);
  useEffect(()=>{
    setSearched(items)
  },[items])
  return (
    <div className="flex flex-col">
      {searchedItems.map((item) => (
        <SearchItem item={item} />
      ))}
    </div>
  );
}
const SearchItem = ({ item }) => {
  const [_, setValue] = useLocalStorage("searched-products");

  const deleteItem = () => {
    setValue((value) =>
      value.filter((searchItem) => searchItem.id !== item.id)
    );
  };

  return (
    <div className="grid p-4 first:border-t border-b border-border grid-cols-[1fr_max-content] gap-4">
      <Link href={"/home/search/" + item.query}>
        <div className="font-bold flex gap-2 items-center">
          <MdOutlineHistory size={28} />
          <p>{item.query}</p>
        </div>
      </Link>
      <MdOutlineDelete onClick={deleteItem} size={28} />
    </div>
  );
};
