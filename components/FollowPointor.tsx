
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { stringToColor } from "@/lib/stringToColor"; // Adjust the import path if needed

function FollowPointor({
  x,
  y,
  info,
}: {
  x: number;
  y: number;
  info: { name: string; email: string; avatar: string };
}) {
  const { user, isLoaded, isSignedIn } = useUser();
  
  // Get the email or signed-in user name to generate a color
  const userIdentifier = info?.email || (isSignedIn && isLoaded ? user?.email : "default");
  const color = stringToColor(userIdentifier || "default");  // Provide a default string if neither email nor signed-in user info is available

  // Use the display name from info or signed-in user's name if provided
  const displayName = info?.name || (isSignedIn && isLoaded ? user?.fullName : "naval");  // Default to "naval" if no name is provided

  return (
    <motion.div
      className="h-4 w-4 rounded-full absolute z-50"
      style={{
        top: y,
        left: x,
        pointerEvents: "none",
      }}
      initial={{
        scale: 1,
        opacity: 1,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      exit={{
        scale: 0,
        opacity: 0,
      }}
    >
      <svg
        stroke={color}
        fill={color}
        strokeWidth="1"
        viewBox="0 0 16 16"
        className={`h-6 w-6 text-[${color}] transform -rotate-[70deg] -translate-x-[12px] -translate-y-[10px] stroke-[${color}]`}
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"></path>
      </svg>
      <motion.div
        style={{
          backgroundColor: color,
        }}
        initial={{
          scale: 0.5,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        exit={{
          scale: 0.5,
          opacity: 0,
        }}
        className="px-2 py-2 bg-neutral-200 text-white font-bold whitespace-nowrap min-w-max text-xs rounded-full"
      >
        {displayName}  {/* Use displayName here */}
      </motion.div>
    </motion.div>
  );
}

export default FollowPointor;
