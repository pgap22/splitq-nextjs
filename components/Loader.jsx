"use client"
import dynamic from "next/dynamic"
import {BarLoader} from "react-spinners"
const useMediaQuery = dynamic(()=> import("@uidotdev/usehooks"))
export default function Loader({invert=true}){
    const isDark = useMediaQuery("(prefers-color-scheme: dark)")
    return(
        <BarLoader color={(isDark || invert) ? "black" : "white"}/>
    )
}