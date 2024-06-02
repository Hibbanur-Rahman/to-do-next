"use client";

import Image from "next/image";
import signupImg1 from '@/assets/images/login-img-2.svg';
import Link from "next/link";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";
import DOMAIN from '../../../environmentsVariables';
import { useRouter } from "next/navigation";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router=useRouter();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error("Please fill in all fields");
            return;
        }
        try {
            const response=await axios.post(`${DOMAIN}/users/login`,{email,password});
            if(response.status===200){
                toast.success("Login successfull!!");
                const token=response.data.data.token;
                localStorage.setItem('to-do-token',token);
                setEmail('');
                setPassword('');
                router.push('/');
            }
        } catch (error) {
            toast.error("Failed to login");
        }
    };

    return (
        <div className="sign-up min-h-screen flex flex-wrap justify-center items-center">
            <div className="container p-12 w-9/12 rounded-3xl shadow-2xl flex flex-wrap">
                <div className="md:w-1/2 lg:w-1/2 w-full">
                    <h1 className="text-white text-center text-4xl mb-3">Hello Again!</h1>
                    <p className="text-slate-200 text-center">Welcome back, you&apos;ve been missed!</p>
                    <form onSubmit={handleSubmit} className="mt-5">
                        <label htmlFor="email" className="w-full text-white mb-5 mt-3">Email</label>
                        <input
                            type="email"
                            placeholder="hibbanrahmanhyt@gmail.com"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mb-5 mt-3 w-full text-white rounded-lg bg-transparent border-2 p-2"
                        />
                        <label htmlFor="password" className="w-full text-white mb-5 mt-3">Password</label>
                        <input
                            type="password"
                            placeholder="1234"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mb-5 mt-3 w-full text-white rounded-lg bg-transparent border-2 p-2"
                        />
                        <button
                            type="submit"
                            className="text-white rounded-lg w-full justify-center items-center text-xl py-3"
                        >
                            Sign In
                        </button>
                    </form>
                    <p className="m-0 p-0 text-white text-center mt-5">
                        Not a member? <Link href="/signup">Register now</Link>
                    </p>
                </div>
                <div className="w-1/2 md:flex lg:flex hidden flex-wrap justify-center items-center">
                    <Image src={signupImg1} alt="Signup Image" />
                </div>
            </div>
        </div>
    );
};

export default Login;
