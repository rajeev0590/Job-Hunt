import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  
const logoutHandler = async () => {
  try {
    const res = await axios.get(`${USER_API_END_POINT}/logout`, {
      withCredentials: true,
    });

    // Clear Redux state regardless of backend response
    dispatch(setUser(null));

    if (res.data.success) {
      toast.success(res.data.message);
    } else {
      toast.warning("Logged out locally. Server didn’t confirm.");
    }

    navigate('/login');
  } catch (error) {
    dispatch(setUser(null)); // Still clear user state even if server call fails
    toast.error(error?.response?.data?.message || 'Logout failed');
    navigate('/login');
  }
};


  const navLinks = user?.role === 'recruiter' ? (
    <>
      <li><Link to="/admin/companies" className="hover:text-[#F83002] transition">Companies</Link></li>
      <li><Link to="/admin/jobs" className="hover:text-[#F83002] transition">Jobs</Link></li>
    </>
  ) : (
    <>
      <li><Link to="/" className="hover:text-[#F83002] transition">Home</Link></li>
      <li><Link to="/jobs" className="hover:text-[#F83002] transition">Jobs</Link></li>
      <li><Link to="/browse" className="hover:text-[#F83002] transition">Browse</Link></li>
    </>
  );

  const authSection = !user ? (
    <div className="flex flex-col md:flex-row gap-2 md:gap-4 mt-4 md:mt-0">
      <Link to="/login">
        <Button variant="outline" className="text-[#F83002] hover:bg-[#F83002] hover:text-white rounded-full px-4 py-2 w-full md:w-auto">
          Login
        </Button>
      </Link>
      <Link to="/signup">
        <Button className="bg-[#F83002] text-white hover:bg-[#D6281D] rounded-full px-4 py-2 w-full md:w-auto">
          Signup
        </Button>
      </Link>
    </div>
  ) : (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-white shadow-xl rounded-md text-black z-[9999]">
        <div className='p-4'>
          <div className='flex gap-3 items-center'>
            <Avatar>
              <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
            </Avatar>
            <div>
              <h4 className='font-medium'>{user?.fullname}</h4>
              <p className='text-sm text-gray-600'>{user?.profile?.bio}</p>
            </div>
          </div>
          <div className='flex flex-col my-4 text-gray-600'>
            {user?.role === 'student' && (
              <div className='flex items-center gap-2 cursor-pointer'>
                <User2 />
                <Link to="/profile">
                  <Button variant="link" className="text-[#003366] p-0 h-auto">View Profile</Button>
                </Link>
              </div>
            )}
            <div className='flex items-center gap-2 cursor-pointer'>
              <LogOut />
              <Button onClick={logoutHandler} variant="link" className="text-[#F83002] p-0 h-auto">Logout</Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#153556] text-white shadow-md">
      <div className="w-full px-4 sm:px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold whitespace-nowrap">
          Job<span className="text-[#F83002]">Hunt</span>
        </h1>

        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <nav className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-6 text-sm font-medium">
            {navLinks}
          </ul>
          {authSection}
        </nav>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="flex flex-col gap-4 font-medium text-white">
            {navLinks}
          </ul>
          <div className="mt-4">{authSection}</div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
