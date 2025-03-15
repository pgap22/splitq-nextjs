"use client"
import Link from "next/link"
import IconBox from "@/components/ui/IconBox";
import Input from "@/components/ui/Input";
import { MdOutlineArrowBack } from "react-icons/md";
import { useState } from "react";
import { MdOutlineFastfood, MdOutlineLocalOffer, MdOutlineLocalPizza } from "react-icons/md";
import { useSearchParams } from 'next/navigation'
import { IconTabs } from "@/components/icon-tabs";

export default function SellerProducts({ items, params }) {
    const searchParams = useSearchParams()
    const searchQuery = searchParams.get('q')

    const [itemtype, setItemType] = useState(searchQuery ? searchQuery : "products");
    const [query, setQuery] = useState()



    const searchItem = (e) => {
        let data = e.target.value
        setQuery(data.toLowerCase())
    }

    const changeType = (type) => {
        setItemType(type)
    }


    return (
        <>
            <section className="p-4 grid grid-cols-[max-content_1fr] gap-2">
                <Link href={"/seller"}>
                    <IconBox
                        variant="square"
                        Icon={MdOutlineArrowBack}
                    />
                </Link>
                <Input onInput={searchItem} type="search" placeholder="Buscar producto" />
            </section>

            <h1 className="font-bold text-2xl p-4">Mis Productos</h1>

            <div className="grid grid-cols-2 border-b border-border mb-4">
                <IconTabs label={"Productos"} setItemType={changeType} active={itemtype} Icon={MdOutlineLocalPizza} type={"products"} />
                <IconTabs label={"Combos"} setItemType={changeType} active={itemtype} Icon={MdOutlineFastfood} type={"combos"} />
            </div>
            <InitialProducts type={itemtype} items={items[itemtype]} query={query} />

        </>
    )
}

const InitialProducts = ({ items, query, type }) => {
    if (!items?.length) return;
    const products = query ? items.filter(item => item.name.toLowerCase().startsWith(query)) : items
    return (
        <>
            {
                products.map(producto => (
                    <Link key={producto.id} href={`/seller/manageProducts/${type == "products" ? "product" : "combo"}/` + producto.id}>
                        <div className="border-b border-border">
                            <div className="flex items-start gap-4 p-4">
                                <div className="p-4 aspect-square rounded bg-foreground border border-border">
                                    {
                                        type == "products"
                                            ? <MdOutlineLocalOffer size={24} />
                                            : <MdOutlineFastfood size={24} />
                                    }
                                </div>
                                <div>
                                    <h2 className="font-bold">{producto.name}</h2>
                                    <p className="text-xs text-text-secundary">{producto.seller.name}</p>
                                    <h3 className="text-gradient text-lg font-black bg-gradient-principal">${producto.price}</h3>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))
            }
        </>
    )
}

