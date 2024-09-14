"use client";

import { FormEvent, useEffect, useState, useTransition } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import Editor from "./Editor";
import useOwner from "@/lib/useOwner";
import DeleteCodument from "./DeleteCodument";
import InviteUser from "./Inviteuser";
import ManageUsers from "./ManageUsers";
import Avatars from "./Avatars";
// Ensure correct import

const Document = ({ id }: { id: string }) => {
  const [data, loading, error] = useDocumentData(doc(db, "documents", id));
  const [isUpdating, startTransition] = useTransition();
  const [input, setInput] = useState("");
  const isOwner = useOwner(); // Check if the user is an owner

  useEffect(() => {
    if (data) {
      setInput(data.title); // Update input with document title
    }
  }, [data]);

  const updateTitle = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      startTransition(async () => {
        await updateDoc(doc(db, "documents", id), { title: input });
      });
    }
  };

  return (
    <div>
      <div className="flex max-w-6xl mx-auto justify-between pb-5">
        <form className="flex flex-1 space-x-2" onSubmit={updateTitle}>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Update"}
          </Button>
          {/* Render DeleteDocument component if user is an owner */}
          {/* {isOwner && (
            <>
              <p>Hello</p>
              
            </>
          )} */}
          
          <InviteUser></InviteUser>
          <DeleteCodument></DeleteCodument>
        </form>
      </div>
      <div className="flex max-w-6xl mx-auto   mb-5 gap-x-[69vh]">{/* Manage user and avatar */}
      <ManageUsers></ManageUsers>
      {/* <Avatars></Avatars> */}
      </div>
      <hr className="pb-10" />

      <Editor   />
    </div>
  );
};

export default Document;
