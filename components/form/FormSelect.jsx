"use client"
import { useMediaQuery } from "usehooks-ts"
import { Select, SelectTrigger, SelectItem, SelectContent, SelectGroup, SelectValue } from "../ui/select"
import { Controller } from "react-hook-form"
import { cn } from "@/lib/utils";
export default function FormSelect({
    name,
    rules,
    control,
    placeholder,
    items,
    value,
    error
}) {


    return (
        <Controller
            name={name}
            rules={rules}
            control={control}
            render={({ field }) =>
                <div>

                    <Select onValueChange={field.onChange}>
                        <SelectTrigger className={cn(error && "!border-red-500 !text-red-500", value && "text-text", "hidden md:flex")}>
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent className="!bg-foreground">
                            <SelectGroup>
                                {
                                    items.map(item => <SelectItem key={item.id} className="!bg-background" value={item.id}>{item.name}</SelectItem>)
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <select {...field} className={cn("md:hidden",error && "!border-red-500 !text-red-500", !value && "text-text-secundary","flex !ring-offset-0 !ring-0 p-4 border-border bg-foreground  w-full items-center justify-between rounded-md border   text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1  dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus:ring-slate-300")}>
                        <option disabled selected value="">Seleccione una categoria</option>
                        {
                            items.map(item => <option key={item.id} value={item.id}>{item.name}</option>)
                        }
                    </select>


                    <p className="mt-1 text-xs text-red-500">{error}</p>
                </div>}
        />
    )
}    