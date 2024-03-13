import { useTheme } from "next-themes";
import { MdOutlineDarkMode, MdOutlineDevices, MdOutlineLightMode } from "react-icons/md";

export default function  ThemeIcon(){
    const {theme} = useTheme();

    if(theme == "system") return <MdOutlineDevices />
    if(theme == "dark") return <MdOutlineDarkMode />
    if(theme == "light") return <MdOutlineLightMode />
}