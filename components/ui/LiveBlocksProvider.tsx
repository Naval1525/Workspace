"use client";
import { LiveblocksProvider } from "@liveblocks/react/suspense";

function LiveBlocksProvider({ children }: { children: React.ReactNode }) {
  if (!process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY) {
    throw new Error ("Public key not available");
  }

  return (
    <LiveblocksProvider throttle={16} authEndpoint={"/auth-endpoint "}>
      {children}
    </LiveblocksProvider>
  );
}
export default LiveBlocksProvider;
