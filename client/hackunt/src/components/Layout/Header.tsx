import { Link } from 'react-router-dom';
import logo from "../../assets/logo.png";

const Header = () => {
  return (
    <header className="bg-gray-950 p-4 text-white">
      <nav className="mt-2 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <img src={logo} className="w-16 h-16" alt="Example Image" />
          <Link to="/" className="hover:text-gray-400">Home</Link>
          <Link to="/about-us" className="hover:text-gray-400">About Us</Link>
        </div>
        <div className="flex items-center space-x-8">
          <Link to="/sign-up" className="hover:text-gray-400">Sign Up</Link>
          <Link to="/sign-in" className="hover:text-gray-400">Sign In</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
