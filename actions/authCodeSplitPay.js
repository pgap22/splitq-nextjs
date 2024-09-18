"use server"

import { auth } from "@/auth";
import jwt from "jsonwebtoken"
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
        token_jwt: jwt.sign({id: session.user.id}, process.env.JWT_SPLITPAY_SECRET)
      })
    })
    const data = await res.json();
    console.log(data)
    return data;

  } catch (error) {
    console.log(error)
    return {
      success: false,
    }
  }
}