import { NavLink } from "react-router-dom"

const NotFound = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen gap-4">
                <h1 className="text-3xl font-bold text-gray-500">Page Not Found</h1>
                <NavLink to="/" className="text-blue-500">
                    {`Go back to HomePage🏠`}
                </NavLink>
            </div>
        </>
    )
}

export default NotFound