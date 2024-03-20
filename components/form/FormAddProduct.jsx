"use client"

import { useForm } from "react-hook-form"
import { Select, SelectTrigger, SelectItem, SelectContent, SelectGroup, SelectLabel, SelectValue } from "../ui/select"
import FormInput from "./FormInput"
import FormTextArea from "./FormTextArea"
import { Button } from "../ui/button"

export default function FormAddProduct() {
    const { value, setValue } = useForm()
    return (
        <>
            <form>
                <div className="p-4 flex flex-col gap-5">
                    <h1 className="text-2xl font-bold">Añadir producto</h1>
                    <FormInput
                        label={"Nombre del producto"}
                        placeholder={"Nombre del producto"}
                        type={"text"}
                    />
                    <FormTextArea
                        placeholder={"Escribe acá"}
                        label={"Descripcion del producto"}
                    />
                    <Select>
                        {/* className={cn("!bg-background !text-text-secundary !border", formState.errors.role?.message ? "!border-red-500" : getValues("role") ? "!border-blue-500" : "!border-border")} */}
                        <SelectTrigger className="!text-md p-4 !bg-background !border-border">
                            <SelectValue placeholder="Selecciona una categoria" />
                        </SelectTrigger>
                        <SelectContent className="!bg-foreground">
                            <SelectGroup>
                                <SelectLabel>Categoria</SelectLabel>
                                <SelectItem className="!bg-background" value="cat-1">Cat-1</SelectItem>
                                <SelectItem className="!bg-background" value="cat-2">Cat-2</SelectItem>
                                <SelectItem className="!bg-background" value="cat-3">Cat-3</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <div className="flex flex-col">
                        <label htmlFor="xd">
                            <p>Imagenes del producto</p>
                            <div className="p-3 rounded-lg text-sm bg-foreground border border-border text-center font-bold">
                                Subir Imagen
                            </div>
                        </label>
                        <input type="file" hidden id="xd" />
                    </div>
                    <div className="gap-2 flex flex-col">
                        <p>Precio del producto</p>
                        <div className="grid grid-cols-4 gap-4">
                            <PriceButton
                                price={"1.00$"}
                                value={"1.00"}
                            />
                            <PriceButton
                                price={"0.25$"}
                                value={"0.25"}
                            />
                            <PriceButton
                                price={"0.10$"}
                                value={"0.10"}
                            />
                            <PriceButton
                                price={"0.05$"}
                                value={"0.05"}
                            />
                        </div>
                        <FormInput
                            placeholder={value}
                        />
                    </div>
                    <Button>Añadir producto</Button>
                </div>
            </form>
        </>
    )
}

const PriceButton = ({ price, value }) => {
    return (
        <div className="border border-gradient rounded text-center">
            <button value={value}>{price}</button>
        </div>
    )
}