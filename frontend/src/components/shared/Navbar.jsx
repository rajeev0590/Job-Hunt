// import React from 'react'
// import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
// import { Button } from '../ui/button'
// import { Avatar, AvatarImage } from '../ui/avatar'
// import { LogOut, User2 } from 'lucide-react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import axios from 'axios'
// import { USER_API_END_POINT } from '@/utils/constant'
// import { setUser } from '@/redux/authSlice'
// import { toast } from 'sonner'

// const Navbar = () => {
//     const { user } = useSelector(store => store.auth);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const logoutHandler = async () => {
//         try {
//             const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
//             if (res.data.success) {
//                 dispatch(setUser(null));
//                 navigate("/");
//                 toast.success(res.data.message);
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error(error.response.data.message);
//         }
//     }

//     return (
//         <div className="w-full bg-[#153556] text-white overflow-x-hidden">
//             <div className='flex flex-wrap items-center justify-between px-4 sm:px-6 py-4 mx-auto w-full max-w-screen-xl'>
//                 {/* Logo */}
//                 <div className='flex items-center'>
//                     <h1 className='text-2xl font-bold whitespace-nowrap'>
//                         Job<span className='text-[#F83002]'>Hunt</span>
//                     </h1>
//                 </div>

//                 {/* Navigation Links */}
//                 <div className='flex flex-wrap items-center gap-4 sm:gap-6 md:gap-12'>
//                     <ul className='flex flex-wrap font-medium items-center gap-4 sm:gap-6'>
//                         {
//                             user && user.role === 'recruiter' ? (
//                                 <>
//                                     <li><Link to="/admin/companies" className="hover:text-[#F83002] transition">Companies</Link></li>
//                                     <li><Link to="/admin/jobs" className="hover:text-[#F83002] transition">Jobs</Link></li>
//                                 </>
//                             ) : (
//                                 <>
//                                     <li><Link to="/" className="hover:text-[#F83002] transition">Home</Link></li>
//                                     <li><Link to="/jobs" className="hover:text-[#F83002] transition">Jobs</Link></li>
//                                     <li><Link to="/browse" className="hover:text-[#F83002] transition">Browse</Link></li>
//                                 </>
//                             )
//                         }
//                     </ul>

//                     {/* Auth Buttons or User Profile */}
//                     {
//                         !user ? (
//                             <div className='flex flex-wrap items-center gap-2 sm:gap-4'>
//                                 <Link to="/login">
//                                     <Button variant="outline" className="text-[#F83002] hover:bg-[#F83002] hover:text-white transition-all rounded-full px-4 py-2">
//                                         Login
//                                     </Button>
//                                 </Link>
//                                 <Link to="/signup">
//                                     <Button className="bg-[#F83002] text-white hover:bg-[#D6281D] rounded-full px-4 py-2 transition-all">
//                                         Signup
//                                     </Button>
//                                 </Link>
//                             </div>
//                         ) : (
//                             <Popover>
//                                 <PopoverTrigger asChild>
//                                     <Avatar className="cursor-pointer">
//                                         <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
//                                     </Avatar>
//                                 </PopoverTrigger>
//                                 <PopoverContent className="w-80 bg-white shadow-xl rounded-md">
//                                     <div className='p-4'>
//                                         <div className='flex gap-3 items-center'>
//                                             <Avatar className="cursor-pointer">
//                                                 <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
//                                             </Avatar>
//                                             <div>
//                                                 <h4 className='font-medium'>{user?.fullname}</h4>
//                                                 <p className='text-sm text-gray-600'>{user?.profile?.bio}</p>
//                                             </div>
//                                         </div>
//                                         <div className='flex flex-col my-4 text-gray-600'>
//                                             {
//                                                 user && user.role === 'student' && (
//                                                     <div className='flex items-center gap-2 cursor-pointer'>
//                                                         <User2 />
//                                                         <Button variant="link" className="text-[#003366]">
//                                                             <Link to="/profile">View Profile</Link>
//                                                         </Button>
//                                                     </div>
//                                                 )
//                                             }

//                                             <div className='flex items-center gap-2 cursor-pointer'>
//                                                 <LogOut />
//                                                 <Button onClick={logoutHandler} variant="link" className="text-[#F83002]">Logout</Button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </PopoverContent>
//                             </Popover>
//                         )
//                     }
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Navbar



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
      if (res.data.success) {
        dispatch(setUser(null));
        navigate('/');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
<header className="fixed top-0 left-0 w-full  bg-[#153556] text-white shadow-md">
  <div className="w-full px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-2xl font-bold whitespace-nowrap">
          Job<span className="text-[#F83002]">Hunt</span>
        </h1>

        {/* Hamburger for mobile */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-6 text-sm font-medium">
            {user && user.role === 'recruiter' ? (
              <>
                <li>
                  <Link to="/admin/companies" className="hover:text-[#F83002] transition">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs" className="hover:text-[#F83002] transition">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" className="hover:text-[#F83002] transition">Home</Link>
                </li>
                <li>
                  <Link to="/jobs" className="hover:text-[#F83002] transition">Jobs</Link>
                </li>
                <li>
                  <Link to="/browse" className="hover:text-[#F83002] transition">Browse</Link>
                </li>
              </>
            )}
          </ul>

          {/* Auth or Avatar */}
          {!user ? (
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="outline" className="text-[#F83002] hover:bg-[#F83002] hover:text-white rounded-full px-4 py-2">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#F83002] text-white hover:bg-[#D6281D] rounded-full px-4 py-2">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="Profile" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-white shadow-xl rounded-md text-black">
                <div className="p-4">
                  <div className="flex gap-3 items-center">
                    <Avatar>
                      <AvatarImage src={user?.profile?.profilePhoto} alt="Profile" />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.fullname}</h4>
                      <p className="text-sm text-gray-600">{user?.profile?.bio}</p>
                    </div>
                  </div>
                  <div className="flex flex-col my-4 text-gray-600">
                    {user?.role === 'student' && (
                      <div className="flex items-center gap-2">
                        <User2 />
                        <Button variant="link" className="text-[#003366]">
                          <Link to="/profile">View Profile</Link>
                        </Button>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <LogOut />
                      <Button onClick={logoutHandler} variant="link" className="text-[#F83002]">Logout</Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </nav>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="flex flex-col gap-4 text-sm font-medium">
            {user && user.role === 'recruiter' ? (
              <>
                <li><Link to="/admin/companies">Companies</Link></li>
                <li><Link to="/admin/jobs">Jobs</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/jobs">Jobs</Link></li>
                <li><Link to="/browse">Browse</Link></li>
              </>
            )}
          </ul>
          <div className="mt-4 flex flex-col gap-2">
            {!user ? (
              <>
                <Link to="/login">
                  <Button variant="outline" className="w-full text-[#F83002] hover:bg-[#F83002] hover:text-white rounded-full">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button className="w-full bg-[#F83002] text-white hover:bg-[#D6281D] rounded-full">Signup</Button>
                </Link>
              </>
            ) : (
              <Button onClick={logoutHandler} className="w-full bg-[#F83002] hover:bg-[#D6281D] text-white rounded-full">Logout</Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
