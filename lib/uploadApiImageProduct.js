import { signatureCloudinary } from "./signatureCloudinary";
export async function uploadApiImageProduct(file,id_product){
    try {
        const formData = new FormData();

        const timestamp=Math.round((new Date).getTime()/1000)
    
        formData.set("file", file)
        formData.set("use_filename", true)
        formData.set("timestamp", timestamp)
        formData.set("api_key", process.env.CLOUDINARY_KEY)
        formData.set("signature", signatureCloudinary({
            timestamp,
            use_filename: true
        }))
       const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/upload`,{
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