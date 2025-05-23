

import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            dispatch(setLoading(false));
        }
    }
    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate])

    return (
        <div>
            <Navbar />
            {/* Add padding top to prevent navbar overlap */}
            <div className='pt-12 flex items-center justify-center min-h-screen bg-gray-50 px-4'>

                <form 
                    onSubmit={submitHandler} 
                    className='w-full max-w-md bg-white border border-gray-200 rounded-md p-6 shadow-md'
                >
                    <h1 className='font-bold text-2xl mb-6 text-center text-gray-900'>Login</h1>
                    
                    <div className='mb-4'>
                        <Label htmlFor="email" className="block mb-1 font-medium text-gray-700">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="Enter your email"
                            required
                            className="w-full"
                        />
                    </div>

                    <div className='mb-4'>
                        <Label htmlFor="password" className="block mb-1 font-medium text-gray-700">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Enter your password"
                            required
                            className="w-full"
                        />
                    </div>

                    <div className='mb-6'>
                        <RadioGroup className="flex items-center gap-6">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    id="student"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                    required
                                />
                                <Label htmlFor="student" className="cursor-pointer">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    id="recruiter"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                    required
                                />
                                <Label htmlFor="recruiter" className="cursor-pointer">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {
                        loading 
                        ? <Button className="w-full py-3 flex justify-center items-center" disabled>
                            <Loader2 className='mr-2 h-5 w-5 animate-spin' /> Please wait
                          </Button> 
                        : <Button type="submit" className="w-full py-3">Login</Button>
                    }

                    <p className='mt-4 text-center text-sm text-gray-600'>
                        Don't have an account?{' '}
                        <Link to="/signup" className='text-blue-600 hover:underline'>
                            Signup
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login
