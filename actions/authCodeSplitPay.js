"use server"

import { auth } from "@/auth";

export default async function authcodeSplitPay(authcode) {
  try {
    const session = await auth();
    const res = await fetch(process.env.API_SPLITPAY + "/auth", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        authcode,
        id_user: session.user.id
      })
    })
    const data = await res.json();

    return data;

  } catch (error) {
    console.log(error)
    return {
      success: false,
    }
  }
}