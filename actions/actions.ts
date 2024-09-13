// @ts-nocheck
'use server'


import { admindb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
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

export async function deleteDocument(roomId: string) {
    auth().protect();
    
    try {
      // Check if the room exists in Liveblocks first
      try {
        await liveblocks.getRoom(roomId);
      } catch (liveblocksError) {
        if (liveblocksError.error === "ROOM_NOT_FOUND") {
          console.log(`Room ${roomId} not found in Liveblocks, proceeding with Firestore deletion.`);
        } else {
          throw liveblocksError;
        }
      }
  
      // Delete document from Firestore
      await admindb.collection("documents").doc(roomId).delete();
  
      // Delete associated rooms from Firestore
      const query = await admindb
        .collectionGroup("rooms")
        .where("roomId", "==", roomId)
        .get();
      
      const batch = admindb.batch();
      query.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();
  
      // Delete room from Liveblocks if it exists
      try {
        await liveblocks.deleteRoom(roomId);
      } catch (liveblocksError) {
        if (liveblocksError.error !== "ROOM_NOT_FOUND") {
          throw liveblocksError;
        }
      }
  
      return { success: true };
    } catch (error) {
      console.error("Error in deleteDocument:", error);
      return { success: false, error: error.message };
    }
  }