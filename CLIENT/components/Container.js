export default ({ children }) => {
    return (
        <container
            className={`flex min-h-screen h-auto flex-col items-center justify-start`}
        >
            {children}
        </container>
    )
};