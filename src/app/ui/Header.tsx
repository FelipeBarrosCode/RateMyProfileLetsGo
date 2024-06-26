import { Button } from "@/components/ui/button"
import Link from "next/link"
import TransitionLink from "./TransitionLink"


export default function HeaserToUseOnIntro() {

    return (<>

        <div className=" flex flex-row pl-8 pr-8 justify-between items-center w-screen h-14 max-[656px]:pl-4 max-[656px]:pr-4">

            <div>
                <h2><Link href="/">Rate My Profile</Link></h2>
            </div>
            <div className="flex flex-row gap-3">
                <TransitionLink href={"/login"} label={"Login"}/>
                <TransitionLink href={"/signup"} label={"Sign Up"}/>
            </div>


        </div>

    </>)

}