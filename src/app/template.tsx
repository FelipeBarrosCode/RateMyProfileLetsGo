"use client"

import { animatePageIn } from "@/utils/animate"
import { useEffect } from "react"

export default function Template({ children }: { children: React.ReactNode }) {
    const callMethod = useEffect(()=>{
        animatePageIn()
    },[])
    
    return(<div>

        <div id="banner1" className="min-h-screen bg-neutral-950 z-10 fixed top-0 left-0 w-1/4"></div>
        <div id="banner2" className="min-h-screen bg-neutral-950 z-10 fixed top-0 left-1/4 w-1/4"></div>
        <div id="banner3" className="min-h-screen bg-neutral-950 z-10 fixed top-0 left-2/4 w-1/4"></div>
        <div id="banner4" className="min-h-screen bg-neutral-950 z-10 fixed top-0 left-3/4 w-1/4"></div>

        {children}
    </div>)
  }