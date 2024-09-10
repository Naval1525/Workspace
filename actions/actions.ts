'use server'

import { admindb } from "@/firebase-admin";
import { auth } from "@clerk/nextjs/server"; 

export async function createNewDocument(){
    auth().protect();
    const{sessionClaims}=await auth(); 
    const docCollectionsRef=admindb.collection("documents");
    const docRef= await docCollectionsRef.add({
        title:"New Doc"
    })
    await admindb.collection('users').doc(sessionClaims?.email!).collection 
    ('rooms').doc(docRef.id).set({
        userId: sessionClaims?.email!,
        role:"Owner",
        createdAt: new Date(),
        roomId:docRef.id,


    });
    return {docId:docRef.id}; 

}