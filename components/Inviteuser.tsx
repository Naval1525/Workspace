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
import { limitToLast } from "firebase/firestore";
import { deleteDocument, inviteUserToDocument } from "@/actions/actions";
import { toast } from "sonner";
import { Input } from "./ui/input";


function InviteUser() {
  const [isopen, setisopen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();
  const [email, setemail] = useState("");

  const handleInvite = async (e:FormEvent) => {
    e.preventDefault();
    const roomId = pathname.split("/").pop();
    if (!roomId) return;
    startTransition(async () => {
        const {success}=await inviteUserToDocument(roomId,email);
   
      if (success) {
        setisopen(false);
        setemail('');
        router.replace("/");
        toast.success("User Added Succesfully !");
      } else {
        toast.error("Failed to add User to room !");
      }
    });
  };

  return (
    <Dialog open={isopen} onOpenChange={setisopen}>
      <Button asChild variant="outline">
        <DialogTrigger>Invite</DialogTrigger>
      </Button>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite a User to Collaborate</DialogTitle>
          <DialogDescription>
           Enter the Email you want to Invite 
          </DialogDescription>
        </DialogHeader>
        <form className="flex gap-x-3"onSubmit={handleInvite}>
            <Input type="email" placeholder="Email" value={email} onChange={(e)=>setemail(e.target.value)}>
            </Input>
            <Button type="submit" disabled={!email|| isPending}>{isPending?"Inviting":"Invite"}</Button>
        </form>

 
      </DialogContent>
    </Dialog>
  );
}
export default InviteUser;
