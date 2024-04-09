const AdminLayout = ({ children }) => {
    return (
        <>
            <div className='p-4 md:max-w-lg mx-auto'>
                <div className='flex flex-col rounded-lg'>
                    {children}
                </div>
            </div>
        </>
    )
}

export default AdminLayout