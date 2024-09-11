'use client'

import Document from "@/components/Document";

const Documentpage = ({params:{id}}:{
    params:{
        id:string;
    }
}) => {
    console.log(id);
  return <div className="flex flex-col flex-1 min-h-screen">
    <Document id = {id}></Document>

  </div>;
};
export default Documentpage;
