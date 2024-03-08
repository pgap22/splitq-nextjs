"use client"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import {BarLoader} from "react-spinners"
export default function Loader({invert=false}){
    const isDark = useMediaQuery("(prefers-color-scheme: dark)")
    return(
        <BarLoader color={(isDark || invert) ? "black" : "white"}/>
    )
}