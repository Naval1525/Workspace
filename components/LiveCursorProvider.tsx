'use client'
import FollowPointor from './FollowPointor'
import { useMyPresence, useOthers } from "@liveblocks/react/suspense";

function LiveCursorProvider ({children}:{children:React.ReactNode}) {
    const [myPresence ,updateMyPresence]=useMyPresence();
    const others=useOthers();
    const handlePointerMove=(e:React.PointerEvent)=>{
        updateMyPresence({cursor:{x:Math.floor(e.pageX),y:Math.floor(e.pageY)}});
    }
    const handlePointerLeave=()=>{
        updateMyPresence({cursor:null});
    }

    return (
        <div onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
          {others.filter((other) => other.presence.cursor !== null)
            .map(({connectionId, presence, info}) => (
              <FollowPointor
              key={connectionId}
              info={info}
             
              x={presence.cursor!.x}
              y={presence.cursor!.y}
              />
              
            ))}
         
            {children}
        </div>
      );
}
export default LiveCursorProvider;
