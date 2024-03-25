"use client" //for animation
import { cn } from "@/lib/utils"
import {GridLoader} from "react-spinners"
export default function QRLoader({invert=false}){
   
    return(
        <GridLoader color={cn(invert ? "white" : "black")} className="invert dark:invert-0" />
    )
}