import {Liveblocks} from '@liveblocks/node'
const key = process.env.LIVEBLOCKS_PRIVATE_KEY;
if(!key){
    throw new Error("Live Blocks Private Key is Missing ");
}
const liveblocks = new Liveblocks({
    secret:key,
})

export default liveblocks