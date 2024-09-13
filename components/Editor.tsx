"use client";

import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { useRoom, useSelf } from "@liveblocks/react/suspense";
import { useEffect, useState } from "react";
import * as Y from "yjs";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { BlockNoteView } from "@blocknote/shadcn";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css";
import { BlockNoteEditor } from "@blocknote/core";
import { stringToColor } from "@/lib/stringToColor";
import { useUser } from "@clerk/nextjs"; // Import useUser from Clerk

type EditorProps = {
  doc: Y.Doc;
  provider: any;
  darkMode: boolean;
};

function BlockNote({ doc, provider, darkMode }: EditorProps) {
  const userinfo = useSelf((me) => me.info);
  const { user } = useUser(); // Get user info from Clerk

  const editor: BlockNoteEditor = useCreateBlockNote({
    collaboration: {
      provider,
      fragment: doc.getXmlFragment("document-store"),
      user: {
        name: user?.fullName || userinfo?.name, // Use Clerk user name or fallback to userinfo name
        // color: stringToColor(user?.fullName || userinfo?.name), // Use Clerk user name for color generation
        color:"#FF69B4"
      },
    },
  });

  return (
    <div className="relative max-h-6xl">
      <BlockNoteView
        className="mix-h-screen"
        editor={editor}
        theme={darkMode ? "dark" : "light"}
      ></BlockNoteView>
    </div>
  );
}

function Editor() {
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setprovider] = useState<LiveblocksYjsProvider>();
  const [darkMode, setdarkMode] = useState(false);
  const style = `hover: text-white ${
    darkMode
      ? "text-gray-300 bg-gray-700 hover:bg-gray-100 hover: text-gray-700"
      : "text-gray-700 bg-gray-200 hover:bg-gray-300 hover: text-gray-700"
  }`;

  useEffect(() => {
    const ydoc = new Y.Doc();
    const yprovider = new LiveblocksYjsProvider(room, ydoc);
    setDoc(ydoc);
    setprovider(yprovider);
    return () => {
      ydoc?.destroy();
      yprovider?.destroy();
    };
  }, [room]);

  if (!doc || !provider) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-2 justify-end mb-10">
        {/* translate document */}
        {/* chat todcou */}

        <Button className={style} onClick={() => setdarkMode(!darkMode)}>
          {darkMode ? <SunIcon></SunIcon> : <MoonIcon></MoonIcon>}
        </Button>
      </div>
      <BlockNote doc={doc} provider={provider} darkMode={darkMode}></BlockNote>
    </div>
  );
}

export default Editor;
