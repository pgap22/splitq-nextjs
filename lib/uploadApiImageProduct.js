import { signatureCloudinary } from "./signatureCloudinary";
import { writeFile } from "fs/promises";
import path from "path";
export async function uploadApiImageProduct(file) {
    try {
        const deploy = process.env.DEPLOYMENT
        if (deploy == "local") {
            const buffer = Buffer.from(await file.arrayBuffer());
            
            const public_id = Date.now()+"";

            const filename = file.name.replaceAll(" ", "_");

            await writeFile(
                path.join(process.cwd(), "public/uploads/" + filename),
                buffer
            );
            console.log(process.cwd(), "public/uploads/" + filename)
            return {
                url: "/uploads/"+filename,
                public_id
            };
        }

        const formData = new FormData();

        const timestamp = Math.round((new Date).getTime() / 1000)

        formData.set("file", file)
        formData.set("use_filename", true)
        formData.set("timestamp", timestamp)
        formData.set("api_key", process.env.CLOUDINARY_KEY)
        formData.set("signature", signatureCloudinary({
            timestamp,
            use_filename: true
        }))
        const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/upload`, {
            method: 'POST',
            body: formData
        })
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        throw error
    }
}