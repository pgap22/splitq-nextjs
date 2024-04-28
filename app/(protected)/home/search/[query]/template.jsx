"use client"

import { useParams } from "next/navigation"
import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

export default function TemplateSearch({children}) {
    const params = useParams();
    const [searched, setSearched] = useLocalStorage("searched-products",[]);
    useEffect(()=>{
        const data = {
            id: searched.length,
            query: params.query
        }
        if(searched.some(item => item.query == params.query)) return

        setSearched([...searched, data])
    },[])
    return(
        <>{children}</>
    )
}