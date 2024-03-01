import Image from "next/image"
import { useTheme } from "./theme-provider"

export const Logo = ({width = 128}) => {
    const {theme} = useTheme()
    if(theme=='dark') return <Image width={width} height={120} src="/logo_dark.svg" alt="" />
    return <Image width={width} height={120} src="/logo.svg" alt="" />
}