import { auth } from "@/auth";
import FormSplitPayConnect from "@/components/form/formSplitPayConnect";
export default async function SplitPayPage() {
    const session = await auth();
    return (
        <section className="flex flex-col items-center text-center">
            <h2 className="font-bold text-3xl text-gradient bg-aqua-gradient">SplitPay</h2>
            <FormSplitPayConnect session={session} />
        </section>
    )
}