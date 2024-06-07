import Image from "next/image";
import logo from '@/assets/images/logo.png';
import profile from '@/assets/images/profile.jpg';
const Navbar=()=>{
    return(
        <div className="Navbar w-full flex flex-wrap">
                <Image src={logo} alt="" className="" style={{height:'80px !important', width:'160px !important'}} />
               
            {/** =========== Navbar profile ========== */}
            <div className="">
                    <p className="">Hibbanur Rahman</p>
                    <div className="rounded-lg">
                        <Image src={profile} alt="" />
                    </div>
                </div>
        </div>
    )
}

export default Navbar;
