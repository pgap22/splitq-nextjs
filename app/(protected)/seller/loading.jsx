import Loader from "@/components/Loader";

export default function Loading(){
    return(
        <div className="flex h-screen justify-center items-center">
            <Loader invert/>
        </div>
    )
}