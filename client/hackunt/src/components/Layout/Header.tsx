import { Link } from 'react-router-dom';
import spider from '../../assets/spider.svg'
import web from '../../assets/web.svg'

const Header = () => {
  return (
    <header className="bg-gray-800 p-4 text-white relative">
      <img src={web} className="h-40 w-40 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2" /> 
      <nav className="mt-2 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Link to="/" className="hover:text-gray-400 text-xl">Home</Link>
          <Link to="/about-us" className="hover:text-gray-400 text-xl">About Us</Link>
          <img src={spider} className='h-12 w-12'/>
        </div>
        <div className="flex items-center space-x-8">
          <Link to="/register" className="hover:text-gray-400">Sign Up</Link>
          <Link to="/login" className="hover:text-gray-400">Sign In</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
