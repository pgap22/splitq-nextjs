import Loader from "@/components/Loader";

export default function Loading(){
    return(
        <div className="h-screen flex justify-center items-center">
            <Loader invert/>
        </div>
    )
}