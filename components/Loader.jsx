"use client"
import {BarLoader} from "react-spinners"
import { useMediaQuery } from "@uidotdev/usehooks"
export default function Loader({invert=true}){
    const isDark = useMediaQuery("(prefers-color-scheme: dark)")
    return(
        <BarLoader color={(isDark || invert) ? "black" : "white"}/>
    )
}