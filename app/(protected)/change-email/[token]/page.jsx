import { verifyEmailToken } from "@/actions/verifyEmailToken";
import { redirect } from "next/navigation";
import LoaderUpdate from "./LoaderUpdate";

export default async function VerifyPage({ params }) {

    const token = await verifyEmailToken(params.token)
    // if (token.error) return redirect("/");
    console.log(token);
    return (
         <>
            <LoaderUpdate token={token} />
         </>        
    )
}
