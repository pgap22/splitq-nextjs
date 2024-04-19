"use client"
import FormInput from "@/components/form/FormInput";
import FormTextArea from "@/components/form/FormTextArea";
import { minusDecimal, sumDecimal } from "@/lib/decimal";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";


export default function FormCreateRefoundBalance({ balance }) {
    const { register, handleSubmit, formState ,watch, getValues,setValue } = useForm({
        defaultValues: {
            reason: "",
            refoundBalance: ""
        }
    });

    const submitRefound = (data)=>{
        console.log(data)
    }

    return (
        <>
            <form noValidate onSubmit={handleSubmit(submitRefound)} className="flex flex-col gap-2 mt-2" action="">
                <FormTextArea
                    register={register("reason", {required: {
                        value: true,
                        message: "Este campo es requerido"
                    }})}
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

                                if(currentValue > balance){
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
                    {watch("refoundBalance") >= 1 && <p className="font-bold text-text-secundary">Tu nuevo saldo sera de: ${sumDecimal((watch("refoundBalance") * -1), balance)}</p>}
                </div>
                <Button>Enviar Solicitud</Button>
            </form>
        </>
    )
}