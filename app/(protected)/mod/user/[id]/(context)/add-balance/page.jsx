"use client"
import IconBox from "@/components/ui/IconBox";
import Input from "@/components/ui/Input";
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
    DrawerTrigger,
} from "@/components/ui/drawer"
export default function AddBalance() {
    const { userDetails } = useUserDetail();
    const { register, getValues, setValue } = useForm({
        defaultValues: {
            balance: 0
        }
    });

    const setPrice = (value) => {
        // alert(sumDecimal(getValues("balance"), value))
        setValue("balance", sumDecimal(getValues("balance"), value))
    }

    return (
        <>
            <main className="p-4">
                <div className="flex gap-2 items-center mb-4">
                    <Link href={"/mod/user/" + userDetails.id}>
                        <IconBox variant={"square"} Icon={MdOutlineArrowBack} />
                    </Link>
                    <h1 className="font-bold text-xl">Recarga de "{userDetails.name} {userDetails.lastname}"</h1>
                </div>

                <form className="flex flex-col">
                    <p>Cuanto saldro añadira ?</p>
                    <div className="grid grid-cols-4 gap-2 mb-2">
                        <PriceButton setPrice={setPrice} value={1}>$1.00</PriceButton>
                        <PriceButton setPrice={setPrice} value={0.25}>$0.25</PriceButton>
                        <PriceButton setPrice={setPrice} value={0.10}>$0.10</PriceButton>
                        <PriceButton setPrice={setPrice} value={0.05}>$0.05</PriceButton>
                    </div>
                    <Input {...register("balance")} type="number" className="bg-foreground mb-2" placeholder="$0" />
                    <Drawer>
                        <DrawerTrigger className="w-full">
                            <Button className="w-full" type="button">Agregar Saldo</Button>
                        </DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                                <DrawerDescription>This action cannot be undone.</DrawerDescription>
                            </DrawerHeader>
                            <DrawerFooter>
                                <Button>Submit</Button>
                                <DrawerClose className="w-full">
                                   <Button className="w-full">Cancel</Button>
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