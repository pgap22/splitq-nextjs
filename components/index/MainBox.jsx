import { Children } from "react"

function MainBox({children}) {
    
    return(
        <div className=" border-border border-2 rounded-xl w-4/5 flex flex-col p-7 items-center gap-2">
            {children}
        </div>
    )

}

export default MainBox