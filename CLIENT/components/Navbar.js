
export default ({userData}) => {
    return (
        <nav className="w-full h-40 bg-indigo-600 flex flex-row justify-center gap-20 items-center text-white font-bold">
            {userData?.user?.rol === 1 && <button >Admin</button>}
            <button >Products</button>
            <button >Car</button>
            <button >Logout</button>
        </nav>
    )
}