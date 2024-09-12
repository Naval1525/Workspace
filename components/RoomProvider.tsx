"use client";
import LiveCursorProvider from './LiveCursorProvider';
import  LoadingSpinner from './LoadingSpinner';
import {
  ClientSideSuspense,
  RoomProvider as RoomProviderWrapper,
} from "@liveblocks/react/suspense";
function RoomProvider({
  roomId,
  children,
}: {
  roomId: string;
  children: React.ReactNode;
}) {
  return <RoomProviderWrapper id={roomId} initialPresence={{cursor:null}} >
    <ClientSideSuspense fallback={<LoadingSpinner/>}>
      <LiveCursorProvider> {children}</LiveCursorProvider>
     </ClientSideSuspense>
  </RoomProviderWrapper>;
}
export default RoomProvider;
