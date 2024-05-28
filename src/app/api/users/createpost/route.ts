"use server"
import {connect} from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import PostConf from "@/models/postModel"
import { getDataFromToken } from "@/helpers/getDataFromToken";


connect()




export async function POST(request: NextRequest) {

    try {

        const outGoingRequest = await request.json()

        
        console.log(outGoingRequest)
      

        let {
            profileName,
            realName,
            platform,
            userAge,
            fakeProbability,
            botProbability,
            comment,
            profilePurpouse,
            politicalPosition,
            URLprofile
          } = outGoingRequest;

          const check = await PostConf.findOne({profileLinkURL:URLprofile})


          if(platform=="" || profileName==""){
            return NextResponse.json({message: "Missing essential information"}, {status: 400})
          }

          if(check != null || check != undefined){
            
            return NextResponse.json({message: "This Profile has Already an URL associated with it"}, {status: 400})
            
          }

          platform = platform + ".com"

          


          if((!(URLprofile.includes(profileName)) || !(URLprofile.includes(platform)))){
            
           
            return NextResponse.json({message: "The URL for this Profile is not associated with the input name of the profile"}, {status: 400})          
          }

          const response = await fetch(URLprofile); 
            if (!response.ok){
                
                return NextResponse.json({message: "The URL does not exist review the Link that you are using"}, {status: 400})


            }




          outGoingRequest.like =0
          outGoingRequest.personWhoLiked = new Array()
          outGoingRequest.personWhoDisliked= new Array()

        const postCreate = new PostConf({
            profileName: profileName,
            realLifeName: realName, 
            platformThatProfileIsIn: platform,
            age: userAge,
            chanceOfFake: fakeProbability, 
            chanceOfBot: botProbability, 
            listOfVoterUserName: new Map().set(getDataFromToken(request),outGoingRequest), 
            commentsAboutProfile: new Array().push(comment), 
            profilePurpouse: profilePurpouse, 
            politicalPosition: politicalPosition, 

            profileLinkURL: URLprofile
            })

            console.log(postCreate) 
            

            const savedUser = await postCreate.save();

            console.log(savedUser)
            
            return NextResponse.json({message: "Created Post"}, {status: 200})





    } catch (err) {
        return NextResponse.json({message: "Something went wrong try later"}, {status: 400})
    }



}

