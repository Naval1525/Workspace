"use client";

import { useOthers, useSelf } from "@liveblocks/react/suspense";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@clerk/nextjs";

function Avatars() {
  const others = useOthers();  // Other users in the Liveblocks room
  const self = useSelf();  // Current user’s presence in Liveblocks
  const { user } = useUser();  // Clerk user information

  // Combine the current user (self) with others from the Liveblocks room
  const allUsers = [self, ...others];

  // Function to generate avatar URL based on user email
  const getAvatarUrl = (email: string) => {
    return `https://api.dicebear.com/6.x/initials/svg?seed=${encodeURIComponent(email)}`;
  };

  return (
    <div className="flex max-w-6xl mx-auto justify-between items-center mb-5">
      <p className="font-light text-sm">Users currently editing this page</p>
      <div className="flex -space-x-5">
        {allUsers.map((presence, i) => {
          const isCurrentUser = presence.id === self.id;  // Check if it's the current user

          // Fetch email and name, prioritizing Clerk's user data if available
          const userEmail = isCurrentUser 
            ? user?.emailAddresses[0]?.emailAddress 
            : presence.info?.email;
          const userName = isCurrentUser
            ? user?.fullName 
            : presence.info?.name;

          return (
            <TooltipProvider key={presence.id + i}>
              <Tooltip>
                <TooltipTrigger>
                  <Avatar className="border-2 hover:z-50">
                    {isCurrentUser && user?.imageUrl ? (
                      // Show Clerk avatar for the current user if available
                      <AvatarImage src={user.imageUrl} />
                    ) : userEmail ? (
                      // Use generated avatar for other users
                      <AvatarImage src={getAvatarUrl(userEmail)} />
                    ) : (
                      // Fallback to the first letter of the user's name if email is missing
                      <AvatarFallback>{userName?.charAt(0) || '?'}</AvatarFallback>
                    )}
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isCurrentUser ? "You" : (userName || "Unknown")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
    </div>
  );
}

export default Avatars;
