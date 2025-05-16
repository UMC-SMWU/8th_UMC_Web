import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer className='text-gray-400 py-4 text-center'>
        <div>
            <p>
                &copy; {new Date().getFullYear()} 돌려돌려 LP판. All rights reserved.
            </p>
            <div className="flex justify-center space-x-4 mt-4">
                <Link to={"#"}>Privacy Policy</Link>
                <Link to={"#"}>Terms of Service</Link>
                <Link to={"#"}>Contact</Link>
            </div>
        </div>
    </footer>
  )
}

export default Footer
