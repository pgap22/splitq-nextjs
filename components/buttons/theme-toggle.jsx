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
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import IconBox from "../ui/IconBox";
export default function ThemeToggle({ size = 22}) {
    const { setTheme } = useTheme()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger title="theme-button" aria-label="theme" aria-labelledby="theme-button" className="outline-none">
                <IconBox variant={"square"} Icon={() => (
                    <>
                        <MdOutlineLightMode size={size} className={"dark:hidden"} />
                        <MdOutlineDarkMode size={size} className={"hidden dark:block"} />
                    </>
                )} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Temas</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setTheme("light")}>Claro</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>Oscuro</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>Sistema</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}