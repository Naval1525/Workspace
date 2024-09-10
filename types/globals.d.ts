import { User } from "@clerk/nextjs/server";

export{}
declare global {
    interface CustumJwtSessionClaims extends User {}
    
}