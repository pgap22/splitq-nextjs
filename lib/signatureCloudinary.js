import prisma from "@/db/prisma";
import { cloudinary } from "./cloudinary";

export function signatureCloudinary(data){
    return cloudinary.utils.api_sign_request(data, process.env.CLOUDINARY_SECRET)
}