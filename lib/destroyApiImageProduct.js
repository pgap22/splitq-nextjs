import {signatureCloudinary} from "./signatureCloudinary";
export async function destroyApiImageProduct(public_id) {
    try {
        const deploy = process.env.DEPLOYMENT;
        if (deploy == "local") {
            const res = await fetch(
                `${process.env.API_IMAGE_LOCAL}/image/${public_id}`, {
                    method: "DELETE",
                }
            );
            const data = await res.json();
            console.log(data);
            return {
                result: "ok",
            };
        }
        const formData = new FormData();

        const timestamp = Math.round(new Date().getTime() / 1000);

        formData.set("public_id", public_id);
        formData.set("timestamp", timestamp);
        formData.set("api_key", process.env.CLOUDINARY_KEY);
        formData.set(
            "signature",
            signatureCloudinary({
                timestamp,
                public_id,
            })
        );
        const res = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/destroy`, {
                method: "POST",
                body: formData,
            }
        );
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        throw error;
    }
}