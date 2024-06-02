"use client"

import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
export default function Home() {
  const router=useRouter();


  
  useEffect(()=>{
      const token=localStorage.getItem('to-do-token');
      if(!token){
        toast.error("login first");
        router.push('/login');
      }
  },[])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between md:p-24 lg:p-24 p-5">
      <div className="container md:w-5/12 lg:w-5/12 w-full rounded-2xl p-6 shadow-2xl">
        <div className="w-full flex flex-wrap justify-between">
          <input
            type="text"
            placeholder="Add a new task"
            className=" text-white rounded-lg w-10/12 bg-transparent border-2 p-2"
          />

          <button className="add-btn text-white w-1/12 rounded-lg ">
            <i className="bi bi-plus-lg text-white text-3xl"></i>
          </button>
        </div>

        {/** to-do-task section */}
        <div className="flex flex-wrap w-full mt-6">
          <p className="text-white mb-4 mt-4">Tasks to do - 4</p>
          <div className="flex flex-wrap w-full">
            <div className="item-to-do flex flex-wrap items-center rounded-lg py-4 px-3 w-full shadow-xl mt-2 mb-2">
              <p className="w-10/12">To study React fundaments To study React fundamentsTo study React fundamentsTo study React fundaments</p>
              <i className="m-0 p-0 bi bi-check-lg w-1/12 text-3xl cursor-pointer hover:text-green-600"></i>
              <i className="m-0 p-0 bi bi-trash w-1/12 text-2xl cursor-pointer hover:text-red-700"></i>
            </div>
            
          </div>
        </div>

        {/**done-task section */}
        <div className="flex flex-wrap w-full mt-6">
          <p className="text-white mb-4 mt-4">Done - 4</p>
          <div className="flex flex-wrap w-full">
            <div className="item-to-do flex flex-wrap items-center rounded-lg py-4 px-3 w-full shadow-xl mt-2 mb-2">
              <p className="w-10/12 text-green-500 line-through">To study React fundaments</p>
            </div>
          
          </div>
        </div>
      </div>
    </main>
  );
}
