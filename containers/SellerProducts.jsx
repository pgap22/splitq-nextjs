"use client"
import Link from "next/link"
import IconBox from "@/components/ui/IconBox";
import Input from "@/components/ui/Input";
import { getCombos } from "@/actions/getCombos";
import { getProducts } from "@/actions/getProducts";
import { MdOutlineArrowBack } from "react-icons/md";
import Loader from "@/components/Loader";
import { cn } from "@/lib/utils";
import { useEffect, useState, useTransition } from "react";
import { MdOutlineFastfood, MdOutlineLocalOffer, MdOutlineLocalPizza } from "react-icons/md";
import { useForm } from "react-hook-form";

export default function SellerProducts({ initalProducts }) {

    const [itemtype, setItemType] = useState("productos");
    const [itemFetchingInital, setItemFetchingInital] = useState(true)
    const [currentProducts, setCurrentProducts] = useState([]);
    const [loading, startFetching] = useTransition();
    const [query, setQuery] = useState()

    useEffect(() => {
        if (itemFetchingInital) return;

        if (itemtype == "productos") {
            fetchingproductos();
        }
        if (itemtype == "combos") {
            fetchingCombos();
        }

    }, [itemtype])

    useEffect(()=>{
        if(!query) return;
        setCurrentProducts(currentProducts.filter(item => item.name.toLowerCase().startsWith(query)))
    },[query])

    const fetchingproductos = () => {
        startFetching(async () => {
            const productos = await getProducts();
            setCurrentProducts(productos);
        })
    }
    const fetchingCombos = () => {
        startFetching(async () => {
            const combos = await getCombos();
            setCurrentProducts(combos);
        })
    }

    const searchItem = (e)=>{
        let data = e.target.value
        setQuery(data.toLowerCase())
    }

    const changeType = (type) => {
        setItemType(type)
        setItemFetchingInital(false)
    }


    return (
        <>
            <section className="p-4 grid grid-cols-[max-content_1fr] gap-2">
                <Link href={"/mod"}>
                    <IconBox
                        variant="square"
                        Icon={MdOutlineArrowBack}
                    />
                </Link>
                <Input onInput={searchItem} type="search" placeholder="Buscar producto" />
            </section>
            
            <h1 className="font-bold text-2xl p-4">Mis Productos</h1>

            <div className="grid grid-cols-2 border-b border-border mb-4">
                <Tabs key={"productos"} setItemType={changeType} active={itemtype} Icon={MdOutlineLocalPizza} type={"productos"} />
                <Tabs key={"combos"} setItemType={changeType} active={itemtype} Icon={MdOutlineFastfood} type={"combos"} />
            </div>
            <InitialProducts query={query} items={initalProducts} enabled={itemFetchingInital} />
            {
                loading
                    ? <div className="w-full flex justify-center">
                        <Loader invert />
                    </div>
                    : <CurrentItems isInitial={itemFetchingInital} items={currentProducts} />
            }
        </>
    )
}

const CurrentItems = ({ items, isInitial }) => {
    if (isInitial) return

    if (!items.length) return (
        <div className="p-4 font-bold">
            <p>No se han encontrado !</p>
        </div>
    )

    return (
        items.map(producto => (
            <div key={producto} className="border-b border-border">
                <div className="flex items-start gap-4 p-4">
                    <div className="p-4 aspect-square rounded bg-foreground border border-border">
                        <MdOutlineLocalOffer size={24} />
                    </div>
                    <div>
                        <h2 className="font-bold">{producto.name}</h2>
                        <p className="text-xs text-text-secundary">{producto.seller.name}</p>
                        <h3 className="text-gradient text-lg font-black bg-gradient-principal">${producto.price}</h3>
                    </div>
                </div>
            </div>
        ))
    )
}

const InitialProducts = ({ items, enabled, query }) => {
    const products = query ? items.filter(item => item.name.toLowerCase().startsWith(query)) : items
    if (enabled) return (
        <>
            {
                products.map(producto => (
                    <div key={producto} className="border-b border-border">
                        <div className="flex items-start gap-4 p-4">
                            <div className="p-4 aspect-square rounded bg-foreground border border-border">
                                <MdOutlineLocalOffer size={24} />
                            </div>
                            <div>
                                <h2 className="font-bold">{producto.name}</h2>
                                <p className="text-xs text-text-secundary">{producto.seller.name}</p>
                                <h3 className="text-gradient text-lg font-black bg-gradient-principal">${producto.price}</h3>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

const Tabs = ({ Icon, type, active, setItemType }) => {
    return (
        <div onClick={() => setItemType(type)} className={cn("flex justify-center", active !== type && "text-text-secundary")}>
            <div className="w-fit flex flex-col items-center">
                <Icon size={24} />
                <p className="font-bold capitalize">{type}</p>
                <div className={cn(active !== type && "opacity-0", "-mb-0.5 h-1 w-[120%] rounded-full bg-text")}></div>
            </div>
        </div>
    )
}