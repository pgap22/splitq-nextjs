"use client"

import { getUserDetails } from "@/actions/getUserDetails";
import Loader from "@/components/Loader";
import { useUserDetail } from "@/hooks/useUserDetails";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function LayoutGetUserDetail({params, children}) {
    const { userDetails, setUserDetails } = useUserDetail();
    const router = useRouter();
    useEffect(() => {
        (async () => {
            if (!userDetails.name) {
                const userFound = await getUserDetails(params.id);

                if(userFound.error) return router.push("/mod");

                setUserDetails(userFound);
            }
        })()
    }, [])

    if (!userDetails.name) return (
        <div className="flex h-screen justify-center items-center">
            <Loader invert/>
        </div>
    )

    return (
        <>
        {children}
        </>
    )
}