import prisma from "@/db/prisma";
import { checkDB } from "@/lib/checkDB";
import { checkStatus } from "@/lib/checkStatus";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    try {
        const db = await checkDB()
        
        let imagenes = process.env.DEPLOYMENT == "local" ? process.env.API_IMAGE_LOCAL : `https://api.cloudinary.com/v1_1/dft5i06zq/usage`
        let socketio = process.env.NEXT_PUBLIC_SOCKET_IO_SERVER
        console.log(imagenes);
        imagenes = !!await checkStatus(imagenes,{
            auth: {
                username: process.env.CLOUDINARY_KEY,
                password: process.env.CLOUDINARY_SECRET,
            }
        });
        socketio = !!await checkStatus(socketio);

        
    
        return NextResponse.json({ status: {
            db,
            imagenes,
            socketio
        } })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "hubo un error en el servidor" }, { status: 500 })
    }

}
