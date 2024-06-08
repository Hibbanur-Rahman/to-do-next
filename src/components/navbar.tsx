import Image from "next/image";
import logo from "@/assets/images/logo.png";
import profile from "@/assets/images/profile.jpg";

const Navbar = () => {
  return (
    <div className="Navbar w-full flex flex-wrap justify-between items-center p-6">
      <Image
        src={logo}
        alt=""
        className=""
        style={{ height: "80px", width: "180px" }}
      />
      <div className="w-auto flex flex-wrap justify-center items-center">
        <p className="w-auto me-4">Hibbanur Rahman</p>
        <div
          className="shadow-lg p-0 m-0 border-2 rounded-full overflow-hidden flex flex-wrap justify-center items-center"
          style={{ height: "50px", width: "50px" }}
        >
          <Image
            src={profile}
            alt=""
            className="p-0 m-0 rounded-full h-full w-full"
            style={{ height: "50px", width: "50px" }}
          />
        </div>
       

        
      </div>
    </div>
  );
};

export default Navbar;
