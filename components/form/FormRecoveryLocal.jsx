'use client'
import { Button } from "../ui/button";
import Loader from "../Loader";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import FormInput from "./FormInput";
import { useLocalStorage } from "usehooks-ts";
import InfoAlert from "../ui/InfoAlert";
import detectPassToken from "@/actions/detectPassToken";

export default function FormRecoveryLocal() {
    const [loading, sendRecovery] = useTransition();
    const [alertDetectToken, setAlertDetectToken] = useState(false);
    const { register, handleSubmit, formState, setValue, setError } = useForm({
        defaultValues: {
            passToken: ''
        }
    });
    const [recoveryToken] = useLocalStorage('recovery_token')


    const detectTokenDevice = () => {
        setError("passToken", null)
        if (recoveryToken) {
            setAlertDetectToken("Hemos detectado un token en tu dispositivo !")
            setValue('passToken', recoveryToken)
        }else{
            setAlertDetectToken("No hemos detectado un token en tu dispositivo")
        }
    }

    const submit = (data)=>{
        sendRecovery(async()=>{
            try {
                const result =await detectPassToken(data.passToken);
                if(result.error){
                    setError("passToken", {message: result.error})
                }
            } catch (error) {
                console.log(error)
            }
        })
    }

    return (
        <form noValidate onSubmit={handleSubmit(submit)}>
            <h1 className='font-bold text-2xl text-center'>Olvidaste tu contraseña ?</h1>
            <p className='text-text-secundary text-center'>Utiliza el codigo de recuperacion que te hemos otorgado cuando creaste tu cuenta !</p>
            {/* {error && <AlertWarning title={"Advertencia !"} description={error} />} */}
            {alertDetectToken && <InfoAlert description={alertDetectToken} />}
            <div className="mt-4">
                <FormInput
                    label={"Codigo de recuperacion"}
                    placeholder={"Codigo"}
                    type={"text"}
                    register={register("passToken", { required: { value: true, message: "Introduce un codigo de verificacion" } })}
                    error={formState.errors.passToken?.message}
                />
                <Button disabled={loading} className="mt-2 w-full">
                    {
                        loading
                            ? <Loader />
                            : "Enviar"
                    }

                </Button>
                <p onClick={detectTokenDevice} className="text-sm text-center underline cursor-pointer mt-2 text-gray-text">Detectar token en el dispositivo</p>
            </div>
        </form>
    )
}