"use client"
import IconBox from "@/components/ui/IconBox";
import LinkButton from "@/components/buttons/LinkButton";
import { MdOutlineArrowBack, MdOutlineAttachMoney, MdOutlineHistory,MdOutlineCurrencyExchange  } from "react-icons/md";
import Link from "next/link";
import { useUserDetail } from "@/hooks/useUserDetails";
import { useEffect } from "react";

export default function UserDetailsUI({userDetails}) {
    const {setUserDetails} = useUserDetail();
    
    useEffect(()=>{
        setUserDetails(userDetails)
    },[])
    return (
        <>
            <section className="p-4">
                <div className="flex gap-2 items-center">
                    <Link href="/mod">
                        <IconBox variant={"square"} Icon={MdOutlineArrowBack} />
                    </Link>
                    <h1 className="font-bold text-2xl truncate">{userDetails.name} {userDetails.lastname}</h1>
                </div>
                <div className="border w-fit mt-6 border-border bg-foreground p-2 rounded">
                    <p className="font-bold">Saldo Actual: <span className="text-gradient bg-gradient-principal">${+userDetails.balance}</span></p>
                </div>

            </section>
            <LinkButton href={userDetails.id+"/add-balance"} first Icon={MdOutlineAttachMoney}>Agregar Saldo</LinkButton>
            <LinkButton Icon={MdOutlineHistory}>Ver Historial</LinkButton>
            <LinkButton href={userDetails.id+"/refounds"} Icon={MdOutlineCurrencyExchange}>Rembolsos Pendientes</LinkButton>
        </>
    )
}