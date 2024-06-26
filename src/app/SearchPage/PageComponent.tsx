
import Link from "next/link"
import { useEffect, useState } from "react"
import { BellRing, Check } from "lucide-react"
 
import { cn } from "@/lib/utils"
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
import { animatePageOut, animatePageOutWithNoRouter } from "@/utils/animate"
import {useRouter} from "next/navigation"
import axios from "axios"

interface ProfileData{
    profileName: string,
        realLifeName: string,
        platformThatProfileIsIn: string,
        age: number,
        chanceOfFake: number,
        chanceOfBot: number,
        commentsAboutProfile: string[],
        profilePurpouse:string,
        politicalPosition: number,
        profileLinkURL:string,
        listOfVoterUserName: Map<any,any>, 
        _id:string,
        key:number,
        
        
        
}



export default function PageIcon(post:ProfileData){
    const router = useRouter();
    const [politicalPosition, setPoliticalPosition] = useState("");
    let contentToBeUsed
    const test = ()=>{
        
    }

    async function upadteCaching(){

        try{
            const response = await axios.patch("http://localhost:3000/api/users/setNewValueInCache",
                {userSelected:post.profileName}
            )

        }catch(error:any){

            

        }

    }

    function createCustomizedURL(){

        const objToParse: {
            profileName: string;
            realName: string;
            platform: string;
            age: number; // Assuming age is a number
            chanceOfFake: number; // Assuming chanceOfFake is a number
            botChance: number; // Assuming botChance is a number
            profilePurpouse: string;
            politicalPosition: number; // Assuming politicalPosition is a number
            urlLink: string;
            commentsAboutProfile: string[];
            id: string;
          } = {
            profileName: post.profileName,
            realName: post.realLifeName,
            platform: post.platformThatProfileIsIn,
            age: post.age,
            chanceOfFake: post.chanceOfFake,
            botChance: post.chanceOfBot,
            profilePurpouse: post.profilePurpouse,
            politicalPosition: post.politicalPosition,
            urlLink: post.profileLinkURL,
            commentsAboutProfile: post.commentsAboutProfile,
            id: post._id,
          };

        let urlString = "http://localhost:3000/ProfileRatingPage?"

          
        Object.entries(objToParse).map(([key,value])=>{
            if(objToParse.hasOwnProperty(key)){
                urlString += ""+ key + "=" + value + "&"
            }
            
        })

       

        animatePageOut(urlString, router)



    }


    function setProfilePoliticalOpinion(positionInPercentage:number){

        if(positionInPercentage <= 100 && positionInPercentage >= 80){
            return <p className=" text-blue-600">Extreme Right Wing</p>
        }else if(positionInPercentage < 80 && positionInPercentage >= 60){
            return <p className=" text-blue-400">Right Wing</p>
        }else if(positionInPercentage < 60 && positionInPercentage >= 40){
            return <p className=" text-grey">Reasonable wing</p>
        }else if(positionInPercentage < 40 && positionInPercentage >= 20){
            return <p className=" text-red-400">Left Wing</p>
        }else if(positionInPercentage < 20 && positionInPercentage >= 0){
            return <p className=" text-red-600">Extreme Left Wing</p>
        }


    }

    
    


    useEffect(()=>{
        test()
       

        
    },[])


    return(
        <>


        <Card className={cn("w-[380px]")} key={post.key}>
      <CardHeader>
        <CardTitle>{post.profileName}</CardTitle>
        <CardDescription>Profile On {post.platformThatProfileIsIn}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        
        <h3>Profile Political Opinion{setProfilePoliticalOpinion(post.politicalPosition)}</h3>
        <h3>Chance Of Fake: {post.chanceOfFake}%</h3>
        <h3>Chance of Bot: {post.chanceOfBot}%</h3>
        <h3>Profile URL: {post.profileLinkURL}</h3>
        <h3>Profile Purpose: {post.profilePurpouse}</h3>
    
      </CardContent>
      <CardFooter>
      <Button  className=" hover:bg-white hover:text-black" onClick={()=>{
        createCustomizedURL()
        upadteCaching()
      }} >
      
        Go to the page about {post.profileName}
      
      
        
          
        </Button>
      </CardFooter>
    </Card>


     

        
        </>
    )

}