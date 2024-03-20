import Link from "next/link";
import IconBox from "./IconBox";
import { cn } from "@/lib/utils";

export default function LinkButton({href = "/", Icon,first = false, children}) {
    return (
        <Link href={href}>
            <div className={cn(first && "border-t", "border-b border-border p-4")}>
                <div className="flex flex-row items-center gap-4">
                    <IconBox Icon={Icon} />
                    <p>{children}</p>
                </div>
            </div>
        </Link>
    )
}