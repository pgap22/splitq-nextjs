"use server"

import { redirect } from "next/navigation";

export const redirectUser = ({data}) => {
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(data)) return

    redirect("/mod/user/"+data);
}
