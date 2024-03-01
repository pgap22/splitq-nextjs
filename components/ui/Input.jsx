export function Input({type,name,placeholder}){
    return(
        <input className='border border-border rounded-md p-2' type={type} name={name} placeholder={placeholder}></input>
    )
}