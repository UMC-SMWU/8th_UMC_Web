import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="flex flex-col justify-center items-center bg-[#0d0d0d] text-gray-300 space-y-3 py-4">
        <p>© 2025 돌려돌려LP판. All rights reserved.</p>
        <div className="flex justify-center items-center space-x-6">
          <Link to={"#"}>Privacy Policy</Link>
          <Link to={"#"}>Terms of Service</Link>
          <Link to={"#"}>Contact Us</Link>
        </div>
      </div>
    </footer>
  );
}
