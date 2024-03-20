"use client"

import { getUserDetails } from "@/actions/getUserDetails";
import Loader from "@/components/Loader";
import { useUserDetail } from "@/hooks/useUserDetails";
import { useEffect } from "react";

export default function LayoutGetUserDetail({params, children}) {
    const { userDetails, setUserDetails } = useUserDetail();
    useEffect(() => {
        (async () => {
            if (!userDetails.name) {
                const userFound = await getUserDetails(params.id);
                setUserDetails(userFound);
            }
        })()
    }, [])

    if (!userDetails.name) return (
        <div className="flex h-screen justify-center items-center">
            <Loader invert />
        </div>
    )

    return (
        <>
        {children}
        </>
    )
}