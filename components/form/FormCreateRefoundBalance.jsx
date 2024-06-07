"use client"
import FormInput from "@/components/form/FormInput";
import FormTextArea from "@/components/form/FormTextArea";
import { minusDecimal, sumDecimal } from "@/lib/decimal";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { useEffect, useState, useTransition } from "react";
import { createRefoundBalance } from "@/actions/createRefoundBalance";
import Loader from "../Loader";
import { useRouter } from "next/navigation";
import { socket } from "@/lib/socketio";


export default function FormCreateRefoundBalance({ balance, id}) {
    const { register, handleSubmit, formState, watch, getValues, setValue } = useForm({
        defaultValues: {
            reason: "",
            refoundBalance: ""
        }
    });
    const [currentBalance, setCurrentBalance] = useState(balance)
    const [loading, startSubmiting] = useTransition();
    const router = useRouter();

    const submitRefound = (data) => {
        startSubmiting(async () => {
            const result = await createRefoundBalance(data);
            if (result?.error) {
                return;
            }
            router.push("/home/my-refounds")
        })
    }

    
    useEffect(() => {
        socket.connect()

        socket.emit("get_balance", id)


        socket.on("add_balance", (data) => {
            setCurrentBalance(sumDecimal(data.balance, data.recharge))
        })

        socket.on("current_balance", (data) => {
            setCurrentBalance(data.balance)
        })

        return () => {
            socket.disconnect()
        }
    }, [])

    return (
        <>
            <div className="text-xs my-2 border border-border w-fit p-2 rounded bg-foreground text-text-secundary">
                Saldo Actual: <span className="text-gradient bg-gradient-principal font-bold">${currentBalance}</span>
            </div>

            <form noValidate onSubmit={handleSubmit(submitRefound)} className="flex flex-col gap-2 mt-2" action="">
                <FormTextArea
                    register={register("reason", {
                        required: {
                            value: true,
                            message: "Este campo es requerido"
                        }
                    })}
                    label={"Porque deseas realizar el rembolso"}
                    placeholder={"Escribe aqui..."}
                    error={formState.errors.reason?.message}
                />
                <div>
                    <FormInput
                        type={"number"}
                        register={{
                            ...register("refoundBalance", {
                                valueAsNumber: true, required: {
                                    value: true,
                                    message: ""
                                },
                                max: {
                                    value: balance,
                                    message: "No puedes rembolsar esa cantidad de dinero"
                                }
                                , min: {
                                    value: 1,
                                    message: "Minimo de rembolso $1"
                                }
                            }),
                            onInput: (e) => {
                                const previousValue = getValues("refoundBalance")
                                const currentValue = +e.target.value

                                if (currentValue > currentBalance) {
                                    setValue("refoundBalance", previousValue)
                                }

                            }
                        }}
                        max={balance}
                        min={1}
                        label={"Cuanto deseas rembolsar"}
                        placeholder={"$0"}
                        error={formState.errors.refoundBalance?.message}
                    />
                    {watch("refoundBalance") >= 1 && <p className="font-bold text-text-secundary">Tu nuevo saldo sera de: ${sumDecimal((watch("refoundBalance") * -1), currentBalance)}</p>}
                </div>
                <Button disabled={loading}>
                    {
                        loading
                            ? <Loader />
                            : "Solicitar Rembolso"
                    }
                </Button>
            </form>
        </>
    )
}