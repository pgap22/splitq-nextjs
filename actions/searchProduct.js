"use server"

import { redirect } from "next/navigation"

export async function searchProduct(formdata){
    const query = formdata.get("query")
    return redirect("/home/search/"+query)
}