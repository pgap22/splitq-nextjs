"use client"
import { useState } from "react";
import { useSearchParams } from 'next/navigation'
import Link from "next/link";
import IconBox from "@/components/ui/IconBox";
import { MdOutlineArrowBack, MdOutlineFastfood, MdOutlineLocalOffer, MdOutlineLocalPizza } from "react-icons/md";
import Input from "@/components/ui/Input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SellerItems({ items, params }) {
    const searchParams = useSearchParams()
    const searchQuery = searchParams.get("q")
    const [query, setQuery] = useState()

    const searchItem = (e) => {
        let data = e.target.value
        setQuery(data.toLowerCase())
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
            <Tabs defaultValue={searchQuery ?? 'productos'} className="w-full">
                <TabsList className="border-b border-border justify-between">
                    <TabsTrigger className="w-full border-none group flex items-center flex-col" value="productos">
                        <MdOutlineLocalPizza size={24} />
                        <p className="border-b-4 border-transparent group-data-[state=active]:border-white font-bold text-sm capitalize">Productos</p>
                    </TabsTrigger>
                    <TabsTrigger className="w-full border-none group flex items-center flex-col" value="combos">
                        <MdOutlineFastfood size={24} />
                        <p className="border-b-4 border-transparent group-data-[state=active]:border-white font-bold text-sm capitalize">Combos</p>
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="productos">
                    <ItemList 
                        items={items} 
                        type={"PRODUCT"}
                        Icon={MdOutlineLocalPizza}
                        query={query} />
                </TabsContent>
                <TabsContent value="combos">
                    <ItemList 
                        items={items} 
                        type={"COMBO"}
                        Icon={MdOutlineFastfood}
                        query={query} />
                  
                </TabsContent>
            </Tabs>
        </>
    )
}


const ItemList = ({ items, query, type, Icon }) => {
    console.log(type);
    if (query) {
        return items
            .filter(item => item.name.toLowerCase().includes(query))
            .filter(producto => producto.item_type == type)
            .map((producto) => (
                <Item key={producto.id} producto={producto} Icon={Icon} />
            ))
    }
    return items
        .filter(producto => producto.item_type == type)
        .map((producto) => (
        <Item key={producto.id} producto={producto} Icon={Icon} />
    ))
}

const Item = ({ producto, Icon }) => {
    return (
        <Link href={`/seller/manageItems/${producto.id}`}>
            <div className="border-b border-border">
                <div className="flex items-start gap-4 p-4">
                    <div className="p-4 aspect-square rounded bg-foreground border border-border">
                        <Icon size={24} />
                    </div>
                    <div>
                        <h2 className="font-bold">{producto.name}</h2>
                        {producto.item_type == "PRODUCT" ? <h3 className="">Stock: {producto.stock}</h3> : ""}
                        <h3 className="text-gradient text-lg font-black bg-gradient-principal">${producto.price}</h3>
                    </div>
                </div>
            </div>
        </Link>
    )
}