"use client"
import getRecharges from "@/actions/getRecharges";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import { useEffect, useTransition } from "react"
import { useState } from "react"
export default function RechargesList() {
    const [recharges, setRecharges] = useState([])
    const [pending, startTransition] = useTransition();
    const [pagination, setPagination] = useState({ take: 10 })
    const [loadMore, setLoadMore] = useState(false)

    const addMoreRechargesLog = ()=>{
        setPagination({
            take: pagination.take+10
        })
    }
    useEffect(() => {
        startTransition(async () => {
            const { recharges: rechargesResponse, nextOne } = await getRecharges(pagination);
            setLoadMore(nextOne)
            setRecharges(rechargesResponse);
        })
    }, [pagination])

    return (
        <>
            {
                recharges.reverse().map(recharge => (
                    <div className="border-b border-border p-4" key={recharge.id}>
                        <h3 className="font-bold text-sm">{recharge.user.name} {recharge.user.lastname}</h3>
                        <div className="border text-text-secundary w-fit my-1 border-border text-sm p-1 rounded bg-foreground">
                            {dayjs(recharge.createdAt).format("DD/MM/YYYY hh:mm:ss A")}
                        </div>
                        <p className="text-gradient bg-gradient-principal font-bold">${recharge.balance}</p>
                    </div>
                ))
            }

            {
                loadMore && (
                    <div className="p-4">
                        <Button onClick={addMoreRechargesLog} className="w-full">{
                            pending
                                ? <Loader />
                                : "Cargar Mas"
                        }</Button>
                    </div>
                )
            }
        </>
    )
}