import { cn } from "@/lib/utils"
import {BarLoader} from "react-spinners"
export default function Loader({invert=false}){
   
    return(
        <BarLoader color={cn(invert ? "white" : "black")} className="invert dark:invert-0" />
    )
}