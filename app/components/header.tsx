import Image from "next/image";
import { IALink } from "../ia-link";
import {Switch} from "@headlessui/react";
import {ToggleSwitch} from "@/app/components/switch";

interface HeaderProps {
    lightMode:boolean
    setLightMode:(enabled:boolean) => void
}

export default function Header(p:HeaderProps) {

    return (

        <header className="inset-panel z-50" style={{boxShadow:"0px 0px 20px var(--color-inset-shadow)"}}>
            <div className="flex justify-between py-4 px-4 gap-4">
                <div className="">
                    <IALink path="/" className="flex flex-row items-center space-x-2">
                        <Image src={"./images/ia-logo-with-text.png"} width={200} height={50} alt="Immersion Analytics Logo" />
                        {/* <div className="block relative">IMMERSION ANALYTICS</div> */}
                    </IALink>
                </div>
                <div className="flex items-center gap-2">
                    <ToggleSwitch enabled={p.lightMode} setEnabled={p.setLightMode} />
                    <div className={p.lightMode ? '' : 'disabled'}>Light mode</div>
                </div>
                <nav className="nav-buttons flex text-sm items-center gap-2 uppercase">
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