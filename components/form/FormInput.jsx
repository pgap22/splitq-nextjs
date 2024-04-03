import { cn } from "@/lib/utils"
import Input from "../ui/Input"

function FormInput({
    label,
    placeholder,
    type,
    error,
    register,
    className,
    step
}) {
    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col-reverse">
                <Input required step={step} className={cn("valid:border-blue-500 transition-all", error && "!border-red-500 !placeholder-red-500",className)} placeholder={placeholder} type={type} {...register} />
                <label className={cn("font-bold",error && "!text-red-500", "label-valid")}>{label}</label>
            </div>
            <p className={cn("text-red-500  text-xs", error && "border-red-500")}>{error}</p>
        </div>
    )
}
export default FormInput