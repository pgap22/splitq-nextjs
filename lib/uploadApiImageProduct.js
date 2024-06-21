import { signatureCloudinary } from "./signatureCloudinary";

export async function uploadApiImageProduct(file) {
    try {
        const formData = new FormData();
        formData.set("file", file)

        const deploy = process.env.DEPLOYMENT

        if (deploy == "local") {
            const res = await fetch(`${process.env.API_IMAGE_LOCAL}/image`, {
                method: 'POST',
                body: formData
            })
            const data = await res.json();
            console.log(data);
            return {
                public_id: data.id,
                url: process.env.API_IMAGE_LOCAL_SERVER+data.url
            }
        }


        const timestamp = Math.round((new Date).getTime() / 1000)

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