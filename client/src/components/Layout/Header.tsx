import { Link } from 'react-router-dom';

const Header = () => {

  return (
    <header className="bg-gray-800 p-4 text-white relative">
       
      <nav className="mt-2 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Link to="/hackunt/" className="hover:text-gray-400 text-xl">Home</Link>
          <Link to="/hackunt/about-us" className="hover:text-gray-400 text-xl">About Us</Link>
        </div>
        <div className="flex items-center space-x-8">
          <Link to="/hackunt/register" className="hover:text-gray-400">Sign Up</Link>
          <Link to="/hackunt/login" className="hover:text-gray-400">Sign In</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
