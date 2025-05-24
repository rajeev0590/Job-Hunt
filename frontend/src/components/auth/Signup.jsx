// // import React, { useEffect, useState } from 'react'
// // import Navbar from '../shared/Navbar'
// // import { Label } from '../ui/label'
// // import { Input } from '../ui/input'
// // import { RadioGroup } from '../ui/radio-group'
// // import { Button } from '../ui/button'
// // import { Link, useNavigate } from 'react-router-dom'
// // import axios from 'axios'
// // import { USER_API_END_POINT } from '@/utils/constant'
// // import { toast } from 'sonner'
// // import { useDispatch, useSelector } from 'react-redux'
// // import { setLoading } from '@/redux/authSlice'
// // import { Loader2 } from 'lucide-react'

// // const Signup = () => {

// //     const [input, setInput] = useState({
// //         fullname: "",
// //         email: "",
// //         phoneNumber: "",
// //         password: "",
// //         role: "",
// //         file: ""
// //     });
// //     const {loading,user} = useSelector(store=>store.auth);
// //     const dispatch = useDispatch();
// //     const navigate = useNavigate();

// //     const changeEventHandler = (e) => {
// //         setInput({ ...input, [e.target.name]: e.target.value });
// //     }
// //     const changeFileHandler = (e) => {
// //         setInput({ ...input, file: e.target.files?.[0] });
// //     }
// //     const submitHandler = async (e) => {
// //         e.preventDefault();
// //         const formData = new FormData();    //formdata object
// //         formData.append("fullname", input.fullname);
// //         formData.append("email", input.email);
// //         formData.append("phoneNumber", input.phoneNumber);
// //         formData.append("password", input.password);
// //         formData.append("role", input.role);
// //         if (input.file) {
// //             formData.append("file", input.file);
// //         }

// //         try {
// //             dispatch(setLoading(true));
// //             const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
// //                 headers: { 'Content-Type': "multipart/form-data" },
// //                 withCredentials: true,
// //             });
// //             if (res.data.success) {
// //                 navigate("/login");
// //                 toast.success(res.data.message);
// //             }
// //         } catch (error) {
// //             console.log(error);
// //             toast.error(error.response.data.message);
// //         } finally{
// //             dispatch(setLoading(false));
// //         }
// //     }

// //     useEffect(()=>{
// //         if(user){
// //             navigate("/");
// //         }
// //     },[])
// //     return (
// //         <div>
// //             <Navbar />
// //             <div className='flex items-center justify-center max-w-7xl mx-auto'>
// //                 <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
// //                     <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
// //                     <div className='my-2'>
// //                         <Label>Full Name</Label>
// //                         <Input
// //                             type="text"
// //                             value={input.fullname}
// //                             name="fullname"
// //                             onChange={changeEventHandler}
// //                             placeholder="Enter your full name"
// //                         />
// //                     </div>
// //                     <div className='my-2'>
// //                         <Label>Email</Label>
// //                         <Input
// //                             type="email"
// //                             value={input.email}
// //                             name="email"
// //                             onChange={changeEventHandler}
// //                           placeholder="Enter your email"
// //                         />
// //                     </div>
// //                     <div className='my-2'>
// //                         <Label>Phone Number</Label>
// //                         <Input
// //                             type="text"
// //                             value={input.phoneNumber}
// //                             name="phoneNumber"
// //                             onChange={changeEventHandler}
// //                           placeholder="Enter your phone number"
// //                         />
// //                     </div>
// //                     <div className='my-2'>
// //                         <Label>Password</Label>
// //                         <Input
// //                             type="password"
// //                             value={input.password}
// //                             name="password"
// //                             onChange={changeEventHandler}
// //                          placeholder="Enter your password"
// //                         />
// //                     </div>
// //                     <div className='flex items-center justify-between'>
// //                         <RadioGroup className="flex items-center gap-4 my-5">
// //                             <div className="flex items-center space-x-2">
// //                                 <Input
// //                                     type="radio"
// //                                     name="role"
// //                                     value="student"
// //                                     checked={input.role === 'student'}
// //                                     onChange={changeEventHandler}
// //                                     className="cursor-pointer"
// //                                 />
// //                                 <Label htmlFor="r1">Student</Label>
// //                             </div>
// //                             <div className="flex items-center space-x-2">
// //                                 <Input
// //                                     type="radio"
// //                                     name="role"
// //                                     value="recruiter"
// //                                     checked={input.role === 'recruiter'}
// //                                     onChange={changeEventHandler}
// //                                     className="cursor-pointer"
// //                                 />
// //                                 <Label htmlFor="r2">Recruiter</Label>
// //                             </div>
// //                         </RadioGroup>
// //                         <div className='flex items-center gap-2'>
// //                             <Label>Profile</Label>
// //                             <Input
// //                                 accept="image/*"
// //                                 type="file"
// //                                 onChange={changeFileHandler}
// //                                 className="cursor-pointer"
// //                             />
// //                         </div>
// //                     </div>
// //                     {
// //                         loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Signup</Button>
// //                     }
// //                     <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
// //                 </form>
// //             </div>
// //         </div>
// //     )
// // }

// // export default Signup

// import React, { useEffect, useState } from 'react'
// import Navbar from '../shared/Navbar'
// import { Label } from '../ui/label'
// import { Input } from '../ui/input'
// import { RadioGroup } from '../ui/radio-group'
// import { Button } from '../ui/button'
// import { Link, useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import { USER_API_END_POINT } from '@/utils/constant'
// import { toast } from 'sonner'
// import { useDispatch, useSelector } from 'react-redux'
// import { setLoading } from '@/redux/authSlice'
// import { Loader2 } from 'lucide-react'

// const Signup = () => {

//     const [input, setInput] = useState({
//         fullname: "",
//         email: "",
//         phoneNumber: "",
//         password: "",
//         role: "",
//         file: ""
//     });
//     const {loading,user} = useSelector(store=>store.auth);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const changeEventHandler = (e) => {
//         setInput({ ...input, [e.target.name]: e.target.value });
//     }
//     const changeFileHandler = (e) => {
//         setInput({ ...input, file: e.target.files?.[0] });
//     }
//     const submitHandler = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();    //formdata object
//         formData.append("fullname", input.fullname);
//         formData.append("email", input.email);
//         formData.append("phoneNumber", input.phoneNumber);
//         formData.append("password", input.password);
//         formData.append("role", input.role);
//         if (input.file) {
//             formData.append("file", input.file);
//         }

//         try {
//             dispatch(setLoading(true));
//             const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
//                 headers: { 'Content-Type': "multipart/form-data" },
//                 withCredentials: true,
//             });
//             if (res.data.success) {
//                 navigate("/login");
//                 toast.success(res.data.message);
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error(error.response.data.message);
//         } finally{
//             dispatch(setLoading(false));
//         }
//     }

//     useEffect(()=>{
//         if(user){
//             navigate("/");
//         }
//     },[])

//     return (
//         <div className="min-h-screen flex flex-col">
//             <Navbar />
//             <div className='flex-grow flex items-center justify-center max-w-7xl mx-auto px-4 py-10 sm:py-16'>
//                 <form 
//                   onSubmit={submitHandler} 
//                   className='w-full max-w-md border border-gray-200 rounded-md p-6 sm:p-8 shadow-md'
//                 >
//                     <h1 className='font-bold text-2xl mb-6 text-center'>Sign Up</h1>
//                     <div className='mb-4'>
//                         <Label>Full Name</Label>
//                         <Input
//                             type="text"
//                             value={input.fullname}
//                             name="fullname"
//                             onChange={changeEventHandler}
//                             placeholder="Enter your full name"
//                             required
//                         />
//                     </div>
//                     <div className='mb-4'>
//                         <Label>Email</Label>
//                         <Input
//                             type="email"
//                             value={input.email}
//                             name="email"
//                             onChange={changeEventHandler}
//                             placeholder="Enter your email"
//                             required
//                         />
//                     </div>
//                     <div className='mb-4'>
//                         <Label>Phone Number</Label>
//                         <Input
//                             type="text"
//                             value={input.phoneNumber}
//                             name="phoneNumber"
//                             onChange={changeEventHandler}
//                             placeholder="Enter your phone number"
//                             required
//                         />
//                     </div>
//                     <div className='mb-4'>
//                         <Label>Password</Label>
//                         <Input
//                             type="password"
//                             value={input.password}
//                             name="password"
//                             onChange={changeEventHandler}
//                             placeholder="Enter your password"
//                             required
//                         />
//                     </div>
//                     <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4'>
//                         <RadioGroup className="flex items-center gap-6">
//                             <div className="flex items-center space-x-2">
//                                 <Input
//                                     type="radio"
//                                     name="role"
//                                     value="student"
//                                     checked={input.role === 'student'}
//                                     onChange={changeEventHandler}
//                                     className="cursor-pointer"
//                                     required
//                                 />
//                                 <Label>Student</Label>
//                             </div>
//                             <div className="flex items-center space-x-2">
//                                 <Input
//                                     type="radio"
//                                     name="role"
//                                     value="recruiter"
//                                     checked={input.role === 'recruiter'}
//                                     onChange={changeEventHandler}
//                                     className="cursor-pointer"
//                                     required
//                                 />
//                                 <Label>Recruiter</Label>
//                             </div>
//                         </RadioGroup>
//                         <div className='flex items-center gap-2'>
//                             <Label>Profile</Label>
//                             <Input
//                                 accept="image/*"
//                                 type="file"
//                                 onChange={changeFileHandler}
//                                 className="cursor-pointer"
//                             />
//                         </div>
//                     </div>
//                     {
//                         loading 
//                         ? <Button className="w-full py-2 flex justify-center items-center gap-2">
//                             <Loader2 className='h-5 w-5 animate-spin' /> Please wait
//                           </Button> 
//                         : <Button type="submit" className="w-full py-2">Signup</Button>
//                     }
//                     <p className='text-center mt-4 text-sm'>
//                         Already have an account? <Link to="/login" className='text-blue-600 hover:underline'>Login</Link>
//                     </p>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default Signup


import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoading, setUser } from '@/redux/slices/authSlice';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, user } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email || !name || !password) {
      toast.error("All fields are required");
      return;
    }

    dispatch(setLoading(true));

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/register`, {
        email, name, password
      });

      toast.success(res.data.message);
      dispatch(setUser(res.data.user));
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  return (
    <div className='max-w-md mx-auto p-6 shadow-md mt-20 border rounded-md'>
      <h2 className='text-2xl font-semibold mb-4 text-center'>Signup</h2>
      <form onSubmit={handleSignup}>
        <div className="mb-4">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="johndoe@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button
          type="submit"
          className="w-full my-4"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Please wait...
            </>
          ) : (
            "Signup"
          )}
        </Button>
      </form>
    </div>
  );
};

export default Signup;
