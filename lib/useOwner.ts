import { db } from "@/firebase";
import { useUser } from "@clerk/nextjs";
import { useRoom } from "@liveblocks/react/suspense";
import { collectionGroup, doc, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";


function useOwner() {
    const {user} = useUser();
    const room = useRoom();
    const [isOwner,setOwner]=useState(false);
    const[usersInRoom]=useCollection(
   user && query(collectionGroup(db,"rooms"),where("roomId","==",room.id)));

   useEffect(()=>{
    if(usersInRoom?.docs&&usersInRoom?.docs.length>0){
        const owners=usersInRoom.docs.filter(
           (doc)=>doc.data().role==="owner");
        if(owners.some(
            (owner)=>owner.data().userId===user?.emailAddresses[0].toString)){

           
            setOwner(true);
        }
       




      
        
    }
        

   },[usersInRoom,user])
    return isOwner;
   
 
}
export default useOwner;
