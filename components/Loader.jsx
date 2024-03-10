"use client"
import { useTheme } from "next-themes"
import {BarLoader} from "react-spinners"
export default function Loader({invert=false}){
    const {systemTheme, theme} = useTheme();
   
    const currentTheme = theme == "system" ? systemTheme : theme

    return(
        <BarLoader color={invert ? (currentTheme=="dark" ? "white" : "black") : (currentTheme=="light" ? "white" : "black")}/>
    )
}