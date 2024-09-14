"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormEvent, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { collectionGroup, limitToLast, query, where } from "firebase/firestore";
import { deleteDocument, inviteUserToDocument, removeUserFromDocument } from "@/actions/actions";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { useUser } from "@clerk/nextjs";
import { useRoom } from "@liveblocks/react/suspense";
import useOwner from "@/lib/useOwner";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "@/firebase";

function ManageUsers() {
  const { user } = useUser();
  const room = useRoom();
  const isOwner = useOwner();
  const [isopen, setisopen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const[usersInRoom]=useCollection(
    user && query(collectionGroup(db,"rooms"),where("roomId","==",room.id)));
  

  const handleDelete = (userId:string) => {
    startTransition(async () => {
        if(!user) return;
      const { success } = await removeUserFromDocument(room.id, userId);
      if (success) {
        toast.success("User Removed Succesfully !");
      } else {
        toast.error("Failed to remove User from room !");
      }
    });


  };
   

  return (
    <Dialog open={isopen} onOpenChange={setisopen}>
      <Button asChild variant="outline">
        <DialogTrigger>Users ({usersInRoom?.docs.length})</DialogTrigger>
      </Button>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Users with Access</DialogTitle>
          <DialogDescription>
            Below is the list of Users who have access to this document
          </DialogDescription>
        </DialogHeader>
        <hr className="my-2"></hr>
        <div className="flex flex-col space-y-2 ">
            {usersInRoom?.docs.map((doc)=>(
                <div className="flex items-center justify-between" key={doc.data().userId}>
                <p className="font-light">{doc.data().userId===user?.emailAddresses[0].toString()?`You (${doc.data().userId})`:doc.data().userId}</p>
                <div className="flex items-center gap-2">
                    <Button variant="outline">{doc.data().role}</Button>
                    { doc.data().role==="Editor" && <Button variant="destructive" onClick={()=>handleDelete(doc.data().userId)}>{isPending?"Removing":"X"}</Button>}
                </div>

                </div>

            

            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
export default ManageUsers;
