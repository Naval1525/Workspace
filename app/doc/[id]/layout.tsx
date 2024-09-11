import { auth } from "@clerk/nextjs/server";

const Doclayout = ({children,params:{id}}:{ children: React.ReactNode ,params:{id:string}}) => {
  auth().protect();
  return <div>{children}</div>;
};
export default Doclayout;
