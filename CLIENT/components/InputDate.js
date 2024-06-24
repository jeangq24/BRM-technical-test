export default ({children, placeholder, textLabel, onChange, value}) => {
    return (
        <>
         <label className="text-gray-600">
                {textLabel}
            </label>
        <div className="relative max-w-xs">
            {children}
            
            <input
                type="date"
                placeholder={placeholder}
                className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                onChange={(e)=>{onChange(e)}}
                value={value}
            />
        </div>
        </>
    )
}