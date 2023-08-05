import Image from "next/image";
import { IALink } from "../ia-link";


export default function() {
    return (

        <header className="inset-panel z-50" style={{boxShadow:"0px 0px 20px rgba(0,0,20,1)"}}>
            <div className="flex items-stretch py-4 px-4">
                <div className="items-start">
                    <IALink path="/" className="flex flex-row items-center space-x-2">
                        <Image src="/images/ia-logo-with-text.png" width={200} height={50} alt="Immersion Analytics Logo" />
                        {/* <div className="block relative">IMMERSION ANALYTICS</div> */}
                    </IALink>
                </div>
                <nav className="nav-buttons flex text-sm items-center gap-2 ml-auto uppercase">
                    <IALink path="/">
                        Learn More
                    </IALink>
                    <IALink path="/contact/" className="accent-btn">
                        Contact Us
                    </IALink>
                </nav>
            </div>
            {/* <Divider /> */}
        </header>


        // <header className="bg-gray-300">
        //     <div className="">
        //         <div className="">
        //             <Link href="/" className="">
        //                 <Image src="/images/ia-logo.png" alt="Immersion Analytics Logo"/>
        //             </Link>
        //         </div>
        //         <div className="nav-buttons flex gap-2 flex-row">
        //             <Link href="/learn-more">Learn More</Link>
        //             <Link href="/contact">Contact Us</Link>
        //         </div>
        //     </div>

        // </header>
    );
}