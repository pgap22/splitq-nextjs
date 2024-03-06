import React from "react"
export default React.forwardRef(function Input(props, ref) {
    return (
        <input {...props} className={props.className + " border transition outline-none border-border rounded-md p-2" }  ref={ref}></input>
    )
})