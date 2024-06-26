"use client"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface ProfileData {
    age: number,
    chanceOfFake: number,
    chanceOfBot: number,
    commentsAboutProfile: string,
    profilePurpouse: string,
    politicalPosition: number,
    like: number,
    _id: string,
    url: string,
    key:string




}



export default function CommentaryComponent(contentAboutComment: ProfileData) {
    const router = useRouter();

    const [likeState,setLike] = useState<number>(contentAboutComment.like);
    const [htmlTag,setHtml] = useState<any>();
    


   
    useEffect(()=>{
        setHtml(chnageLikeColor(likeState))
        
    },[likeState])

   
    function chnageLikeColor(likeAmount:number){
        if(likeAmount ==0){
            return <span>{likeAmount}</span>
        }else if(likeAmount > 0){
            return <span className=" text-green-400">{likeAmount}</span>
        }else if(likeAmount < 0){
            return <span className=" text-red-400">{likeAmount}</span>
        }
    }

    async function requestToIncreaseLike() {


        try {
            
            const response = await axios.patch("/api/users/likeComment", {
                like: true,
                _id: contentAboutComment._id,
                urlLink: contentAboutComment.url,
            })
         
            
            setLike(parseInt(response.data.likes))

            
            
           
            
           
            // Force refresh the page
          

        } catch (err) {

        }
    }
    async function requestToIncreaseDislike() {


        try {
            
            const response = await axios.patch("/api/users/likeComment", {
                like: false,
                _id: contentAboutComment._id,
                urlLink: contentAboutComment.url,
            })
            setLike(parseInt(response.data.likes))
           
           

        } catch (err) {

        }
    }

    function setProfilePoliticalOpinion(positionInPercentage: number) {

        if (positionInPercentage <= 100 && positionInPercentage >= 80) {
            return <p className=" text-blue-600">Extreme Right Wing</p>
        } else if (positionInPercentage < 80 && positionInPercentage >= 60) {
            return <p className=" text-blue-400">Right Wing</p>
        } else if (positionInPercentage < 60 && positionInPercentage >= 40) {
            return <p className=" text-grey">Reasonable wing</p>
        } else if (positionInPercentage < 40 && positionInPercentage >= 20) {
            return <p className=" text-red-400">Left Wing</p>
        } else if (positionInPercentage < 20 && positionInPercentage >= 0) {
            return <p className=" text-red-600">Extreme Left Wing</p>
        }


    }


    return (<>

        <Card key={contentAboutComment.key} className={cn("w-[90%] h-max overflow-x-hidden")}>
            <CardHeader>
                <CardTitle>{contentAboutComment.commentsAboutProfile}</CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">

                <h3>Profile Political Opinion{setProfilePoliticalOpinion(contentAboutComment.politicalPosition)}</h3>
                <h3>Chance Of Fake: {contentAboutComment.chanceOfFake}%</h3>
                <h3>Chance of Bot: {contentAboutComment.chanceOfBot}%</h3>
                <h3>Profile Like Amount: {htmlTag}</h3>
                <h3>Profile Purpose: {contentAboutComment.profilePurpouse}</h3>


            </CardContent>
            <CardFooter className="gap-3">
                <Button className=" hover:bg-white hover:text-black" onClick={requestToIncreaseLike} >

                    Like

                </Button>
                <Button className=" hover:bg-white hover:text-black" onClick={requestToIncreaseDislike} >

                    Dislike

                </Button>

            </CardFooter>
        </Card>


    </>)
}