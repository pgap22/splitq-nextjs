import FormSplitPayConnect from "@/components/form/formSplitPayConnect";

export default function SplitPayPage() {
    return (
        <section className="flex flex-col items-center text-center">
            <h2 className="font-bold text-3xl text-gradient bg-aqua-gradient">SplitPay</h2>
            <p className="text-gray-text">Introduce el codigo de que se muestra en la pantalla de <span className="text-gradient font-bold bg-aqua-gradient">SplitPay</span></p>
            <FormSplitPayConnect />
        </section>
    )
}