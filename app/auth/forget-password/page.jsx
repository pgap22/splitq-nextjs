import FormForgetPassword from "@/components/form/FormForgotPassword";
import FormRecoveryLocal from "@/components/form/FormRecoveryLocal";

export default function ForgetPassword() {
    const local = process.env.DEPLOYMENT
    console.log(local)

    if (!local) return (
        <FormForgetPassword />
    )

    return (
        <FormRecoveryLocal />
    )

}