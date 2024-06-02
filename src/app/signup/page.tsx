import Image from "next/image";
import signupImg from '@/assets/images/login-img.jpg';
import signupImg1 from '@/assets/images/login-img-1.svg';
import Link from "next/link";
const SignUp=()=>{
    return(
        <div className="sign-up min-h-screen flex flex-wrap justify-center items-center">
            <div className="container p-12 w-9/12 rounded-3xl shadow-2xl flex flex-wrap">
                    <div className="md:w-1/2 lg:w-1/2 w-full">
                        <h1 className="text-white text-center text-4xl mb-3"> Create an account</h1>
                        <p className=" text-slate-200 text-center">Sign up now and unlock exclusive access!</p>
                        <form action="" className="mt-5">
                            <label htmlFor="username" className="w-full text-white mb-5 mt-3">User name</label>
                            <input type="text" placeholder="Hibbanur-Rahman" id='username' name='username' className="mb-5 mt-3 w-full text-white rounded-lg bg-transparent border-2 p-2"/>
                            <label htmlFor="email" className="w-full text-white mb-5 mt-3">Email</label>
                            <input type="text" placeholder="hibbanrahmanhyt@gmail.com" id='email' name='email' className="mb-5 mt-3 w-full text-white rounded-lg bg-transparent border-2 p-2"/>
                            <label htmlFor="password" className="w-full text-white mb-5 mt-3">Password</label>
                            <input type="text" placeholder="1234" id='password' name='password' className="mb-5 mt-3 w-full text-white rounded-lg bg-transparent border-2 p-2"/>
                            <button className="text-white rounded-lg w-full justify-center items-center text-xl py-3">Create Account</button>
                        </form>
                        <p className="m-0 p-0 text-white text-center mt-5">Already have account? <Link href='/login'>login</Link></p>
                    </div>
                    <div className="w-1/2 md:flex lg:flex hidden flex-wrap justify-center items-center">
                        <Image src={signupImg1} alt=''/>
                    </div>
            </div>
        </div>
    )
}

export default SignUp;