"use client";
import React, { useEffect } from "react";
import { NewDocumentButton } from "./NewDocumentButton";
import { MenuIcon } from "lucide-react";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { collectionGroup, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import { User } from "@clerk/nextjs/server";
import { useUser } from "@clerk/nextjs";
import { DocumentData } from "firebase-admin/firestore";
import { SidebarOption } from "./SidebarOption";
interface RoomDocument extends DocumentData {
  createdAt: String;
  role: "Owner" | "Editor";
  roomId: String;
  userId: String;
}

export const Sidebar = () => {
  const [groupedData, setGroupedData] = React.useState<{
    Owner: RoomDocument[];
    Editor: RoomDocument[];
  }>({
    Owner: [],
    Editor: [],
  });
  const { user } = useUser();
  const [data, loading, error] = useCollection(
    user &&
      query(
        collectionGroup(db, "rooms"),
        where("userId", "==", user.emailAddresses[0].toString())
      )
  );
  useEffect(() => {
    if (!data) return;
    const grouped = data.docs.reduce<{
      Owner: RoomDocument[];
      Editor: RoomDocument[];
    }>(
      (acc, curr) => {
        const roomData = curr.data() as RoomDocument;
        if (roomData.role === "Owner") {
          acc.Owner.push({
            id: curr.id,
            ...roomData,
          });
        } else {
          acc.Editor.push({
            id: curr.id,
            ...roomData,
          });
        }
        return acc;
      },
      {
        Owner: [],
        Editor: [],
      }
    );
    setGroupedData(grouped);
  }, [data]);
  const menuOptions = (
    <>
      <NewDocumentButton></NewDocumentButton>
      <div className="flex py-4 flex-col space-y-4 md:max-w-36">
        {groupedData.Owner.length === 0 ? (
          <h2 className=" text-gray-500 font-semibold text-sm">
            No Documents Found
          </h2>
        ) : (
          <>
            <h2 className=" text-gray-500 font-semibold text-sm">
              My Documents
            </h2>
            {groupedData.Owner.map((doc) => (
              // <p className="text-black font-semibold text-sm">{doc.roomId} </p>
              <SidebarOption key= {doc.id} id = {doc.id} href={`/doc/${doc.id}`}/>
            ))}
          </>
        )}
      </div>
      {groupedData.Editor.length>0 && (
         <>
         <h2 className=" text-gray-500 font-semibold text-sm">
         Shared with Me
         </h2>
         {groupedData.Owner.map((doc) => (
           // <p className="text-black font-semibold text-sm">{doc.roomId} </p>
           <SidebarOption key= {doc.id} id = {doc.id} href={`/doc/${doc.id}`}/>
         ))}
       </>
      )}

      {/* M
    ydocument */}
      {/* List */}
      {/* share */}
      {/* List */}
    </>
  );
  return (
    <div className="p-2 md:p-5 bg-gray-200 relative">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <MenuIcon
              className="p-2 hover:opacity-30 rounded-lg"
              size={40}
            ></MenuIcon>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <div>{menuOptions}</div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden md:inline"></div>
      {menuOptions}
    </div>
  );
};
