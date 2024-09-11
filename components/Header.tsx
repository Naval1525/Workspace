"use client";

import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import React from "react";
import BreadCrumps from "./BreadCrumps";

export const Header = () => {
  const { user } = useUser();

  return (<div className="flex items-center justify-between p-5">

    {user && <h1 className="text-2xl">{user?.firstName}{`'s`} Space</h1>}
    <BreadCrumps></BreadCrumps>
    <div>
        <SignedOut>
         <SignInButton></SignInButton>
        </SignedOut>
        
        <SignedIn>
         <UserButton></UserButton>
        </SignedIn>
       
    </div>
  
  </div>);
};
