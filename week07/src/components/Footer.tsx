import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-6 mt-12 text-pink-200">
    <div className = "container mx-auto text-center">
         <p>
            &copy; {new Date().getFullYear()} SpinningSpinning Dolimpan. 
            All rights reserved.
        </p>
        <div  className="flex justify-center space-x-4 mt-4">
            <Link to = {"#"}>Privacy Policy</Link>
            <Link to = {"#"}>Terms of Service</Link>
            <Link to = {"#"}>Contact</Link>
        </div>
    </div>
    </footer>
  );
}

export default Footer;