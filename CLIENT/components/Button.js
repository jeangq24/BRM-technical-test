export default ({text, onClick}) => {
    return (
        <button
        onClick={async(e)=>{
            e.preventDefault()
            await onClick()
        }}
        className="px-6 py-3.5 text-white bg-indigo-600 rounded-lg duration-150 hover:bg-indigo-700 active:shadow-lg"
    >
        {text}
    </button>
    )
}