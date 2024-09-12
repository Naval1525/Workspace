"use client";

import { FormEvent, useEffect, useState, useTransition } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import Editor from "./Editor";

const Document = ({ id }: { id: string }) => {
  const[data,loading,error]=useDocumentData(doc(db,"documents",id));
  const[isUpdating,startTransition]=useTransition();
  const [input, setinput] = useState("");
  // const isOwner = useOwner();
  useEffect(()=>{
    if(data){
      setinput(data.title);
    }

  },[data]);
  const updateTitle=(e: FormEvent)=>{
    e.preventDefault();
    if(input.trim()){
      startTransition(async ()=>{
        await updateDoc(doc(db,"documents",id),{
          title:input,
        });
      });

    }


  }
  return (
    <div>
      <div className="flex max-w-6xl mx-auto justify-between pb-5">
        <form className="flex flex-1 space-x-2" onSubmit={updateTitle}>
          <Input
            value={input}
            onChange={(e) => {
              setinput(e.target.value);
            }}
          ></Input>
          <Button disabled={isUpdating} >{isUpdating? "Updating..." : "Update"}</Button>
          {/* updatetittle */}
        </form>
      </div>
      <div>{/* manageuser and avator */}</div>
      <hr className="pb-10"></hr>
      <Editor></Editor>
    </div>
  );
};
export default Document;
