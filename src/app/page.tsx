import Image from "next/image";

export default function Home() {
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
      </div>
    </main>
  );
}
