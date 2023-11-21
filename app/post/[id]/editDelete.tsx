'use client';
import { useCustomSession } from "@/app/sessions";
import Link from 'next/link'
import React from "react";
interface propsType{
  results: {
    id: number;
    userid: string;
    title?: string;
    content?: string;
    username?: string;
    count?: number;
    date?: string;    
  }
}
const deletePost = async (e:number)=>{
  try{
    const res = await fetch('/api/delete',{
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({id: e})
    })
    if(res.ok){
      alert("삭제되었습니다.")
      window.location.href = "/"
    }else{
      alert('삭제에 실패했습니다.')
      return;
    }
  }catch(error){
    console.log(error)
  }
}
export default function EditDelte({results}: propsType){
  const {data: session} = useCustomSession();
  return(
    <React.Fragment>
    {
      session && session.user && (
        (results && session.user.email === results.userid) || session.user.level === 10
      ) &&
      <>
      <Link href={`/`} className="text-black mr-2 p-2 bg-blue-500 rounded mt-5">수정</Link>
      {/* <Link href={`/api/delete/${results.id}`} className="text-black p-2 bg-yellow-500 rounded">삭제</Link> */}
      <button className="text-black mr-2 p-2 bg-yellow-500 rounded mt-5" onClick={()=>deletePost(results.id)}>삭제</button>
      </>
    }
    </React.Fragment>
  )
}