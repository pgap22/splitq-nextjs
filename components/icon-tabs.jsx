"use client"
import { cn } from "@/lib/utils";
export const IconTabs = ({ Icon, type, active, setItemType, label }) => {
    return (
        <div onClick={() => setItemType(type)} className={cn("flex select-none justify-center", active !== type && "text-text-secundary")}>
            <div className="w-fit flex flex-col items-center">
                <Icon size={24} />
                <p className="font-bold text-sm capitalize">{label}</p>
                <div className={cn(active !== type && "opacity-0", "-mb-0.5 h-1 w-[110%] rounded-full bg-text")}></div>
            </div>
        </div>
    )
}