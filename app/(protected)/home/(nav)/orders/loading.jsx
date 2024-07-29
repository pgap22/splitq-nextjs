    import Loader from "@/components/Loader";

    export default function Loading(){
        return(
            <div className="flex z-20 fixed inset-0 bg-background justify-center items-center">
                <Loader invert/>
            </div>
        )
    }