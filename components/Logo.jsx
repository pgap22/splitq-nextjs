"use client"
import {useTheme} from "next-themes"
import Image from "next/image"

export const Logo = ({width = 128}) => {
    const {theme} = useTheme()
    if(theme=='dark') return <Image width={width} height={120} src="/logo_dark.svg" alt="" />
    return <Image width={width} height={120} src="/logo.svg" alt="" />
}