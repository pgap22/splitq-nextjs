"use client"
import { cn } from "@/lib/utils"
import Input from "../ui/Input"
import { useState } from "react"
import { LuEye, LuEyeOff } from "react-icons/lu"

function FormInput({
    label,
    placeholder,
    type,
    error,
    register,
    className,
    disabled,
    step,
    value,
    min,
    max,
    showpass = false,
}) {
    const [typePassword, settypePassword] = useState(showpass)
    const togglePassword = () => settypePassword(e => !e)
    
    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col-reverse">
                <div className="w-full relative">
                    <Input min={min} max={max} disabled={disabled} required step={step} className={cn("valid:border-blue-500 transition-all w-full", error && "!border-red-500 !placeholder-red-500", className)} placeholder={placeholder} type={(
                        type == 'password' ? (typePassword ? 'text' : 'password') : type 
                    )} {...register} />
                    <div onClick={togglePassword} className="w-fit cursor-pointer select-none">
                        {type == "password" && (
                            typePassword ? <LuEyeOff size={20} className="absolute top-1/2 -translate-y-1/2 right-4" /> : <LuEye size={20} className="absolute top-1/2 -translate-y-1/2 right-4" />
                        )}
                    </div>
                </div>
                <label className={cn("font-bold", error && "!text-red-500", "label-valid")}>{label}</label>
            </div>
            {(type == "password" && value && typePassword) && (
                <div className="text-text-secundary text-xs mt-1">
                    Contraseña: <span className="font-bold">{value}</span>
                </div>
            )}
            <p className={cn("text-red-500  text-xs", error && "border-red-500")}>{error}</p>
        </div>
    )
}
export default FormInput