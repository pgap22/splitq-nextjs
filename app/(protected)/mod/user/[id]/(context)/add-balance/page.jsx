"use client"
import IconBox from "@/components/ui/IconBox";
import { Button } from "@/components/ui/button";
import { useUserDetail } from "@/hooks/useUserDetails"
import { sumDecimal } from "@/lib/decimal";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { MdOutlineArrowBack } from "react-icons/md";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import { useEffect, useState, useTransition } from "react";
import FormInput from "@/components/form/FormInput";
import addBalance from "@/actions/addBalance";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { socket } from "@/lib/socketio";


export default function AddBalance() {
    const { userDetails } = useUserDetail();
    const { handleSubmit, register, getValues, setValue, formState: { errors } } = useForm({
        defaultValues: {
            balance: null
        }
    });

    const [pending, startTransition] = useTransition();
    const [drawer, setDrawer] = useState(false);
    const router = useRouter();
    const setPrice = (value) => {
        setValue("balance", sumDecimal(getValues("balance"), value))
    }

    const validateBalance = () => {
        setDrawer(true)
    }

    const submitBalance = ()=>{
        startTransition(async()=>{
            const user = await addBalance(userDetails.id, +getValues("balance"))
            if(!user?.error){
                socket.emit("recharge",{
                    room: userDetails.id,
                    recharge: +getValues("balance"),
                    balance: userDetails.balance,
                })
                alert("Recarga Satisfactoria")
                router.push("/mod/user/"+userDetails.id)
            }
        })
    }
    
    useEffect(()=>{
        socket.emit("user_data", userDetails.id)
    },[])

    return (
        <>
            <main className="p-4">
                <div className="flex gap-2 items-center mb-4">
                    <Link href={"/mod/user/" + userDetails.id}>
                        <IconBox variant={"square"} Icon={MdOutlineArrowBack} />
                    </Link>
                    <h1 className="font-bold text-xl">Recarga de "{userDetails.name} {userDetails.lastname}"</h1>
                </div>

                <form noValidate onSubmit={handleSubmit(validateBalance)} className="flex flex-col">
                    <p>Cuanto saldro añadira ?</p>
                    <div className="grid grid-cols-4 gap-2 mb-2">
                        <PriceButton setPrice={setPrice} value={1}>$1.00</PriceButton>
                        <PriceButton setPrice={setPrice} value={0.25}>$0.25</PriceButton>
                        <PriceButton setPrice={setPrice} value={0.10}>$0.10</PriceButton>
                        <PriceButton setPrice={setPrice} value={0.05}>$0.05</PriceButton>
                    </div>
                    <div>
                        <FormInput
                            register={register("balance", {min: 0.01,valueAsNumber: true ,required: { value: true, message: "Este campo es requerido" } })}
                            type="number"
                            className="bg-foreground mb-2"
                            placeholder="$0"
                            error={errors.balance?.message}
                            step={".01"}

                        />
                    </div>
                    <Button className="mt-2" type="submit">Agregar Saldo</Button>
                    <Drawer open={drawer} onOpenChange={setDrawer}>
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle>Estas seguro de agregar este saldo ?</DrawerTitle>
                                <DrawerDescription>Saldo anterior: ${+userDetails.balance}</DrawerDescription>
                                <DrawerDescription>Saldo despues de la recarga: ${sumDecimal(+userDetails.balance, getValues("balance"))}</DrawerDescription>
                            </DrawerHeader>
                            <DrawerFooter>
                                <Button disabled={pending} onClick={submitBalance}>{
                                    pending ? <Loader />
                                    : "Confirmar Recarga"
                                }</Button>
                                <DrawerClose className="w-full">
                                    <Button variant="outline" className="w-full">Cancel</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </form>
            </main>
        </>
    )
}

const PriceButton = ({ children, value, setPrice }) => {
    const click = () => {
        setPrice(value)
    }

    return (
        <button type="button" onClick={click} className="border py-0.5 rounded border-gradient text-center">{children}</button>
    )
}