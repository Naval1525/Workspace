import React from "react";
import { NewDocumentButton } from "./NewDocumentButton";
import {  MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const Sidebar = () => {
    const menuOptions=(
        <>
        <NewDocumentButton></NewDocumentButton>
        {/* Mydocument */}
        {/* List */}
        {/* share */}
        {/* List */}
        </>

    )
  return (
    <div className="p-2 md:p-5 bg-gray-200 relative">
        <div className="md:hidden">
      <Sheet>
        <SheetTrigger>
          <MenuIcon className="p-2 hover:opacity-30 rounded-lg" size={40}></MenuIcon>
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
