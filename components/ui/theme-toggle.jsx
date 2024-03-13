"use client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"
import { MdOutlineDarkMode, MdOutlineDevices, MdOutlineLightMode } from "react-icons/md";
export default function ThemeToggle() {
    const {setTheme} = useTheme()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="border border-border rounded w-8 aspect-square flex items-center justify-center">
                <MdOutlineLightMode className={"dark:hidden"} />
                <MdOutlineDarkMode className={"hidden dark:block"} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Temas</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={()=> setTheme("light")}>Claro</DropdownMenuItem>
                <DropdownMenuItem onClick={()=> setTheme("dark")}>Oscuro</DropdownMenuItem>
                <DropdownMenuItem onClick={()=> setTheme("system")}>Sistema</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}