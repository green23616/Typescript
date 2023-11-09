'use client'

interface formType{
  name: string;
  title: string;
  content: string;
}

import Link from "next/link";
import { useState } from "react"

export default function Write(){

  const [formData, setFormData] = useState<formType>({
    name: "",
    title: "",
    content: ""
  });

  const changeEvent = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({...formData, [e.target.name] : e.target.value})
    // console.log(formData)
  }

  const submitEvent = async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try{
      const res = await fetch('/api/write', {
        method: "POST",
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(formData)
      })
      if(res.ok){
        const data = await res.json();
        console.log(data.message)
        alert('정상적으로 등록하였습니다.');
        window.location.href="/";
      }else{
        const errorData = await res.json();
        console.log(errorData.error)
      }
    }catch(error){
      console.log(error)
    }
  }
  
  return(
    <>
    <div className="w-full">
      <div className="max-w-7xl mx-auto">
        <div className="flex ml-64 mt-64 relative">

          <Link href="/" className="w-20 h-10 bg-yellow-400 text-white font-bold px-4 py-2 rounded shadow-md hover:text-black hover:bg-orange-500 transition-all duration-150 focus:outline-none text-center mr-5 mt-5">취소</Link>
          <form method="post" onSubmit={submitEvent}>
            <input type="text" name="name" defaultValue={formData.name} placeholder="이름을 입력해주세요" onChange={changeEvent} className="shadow text-gray-700 text-sm mb-2 border w-1/2 outline-none"/>
            <input type="text" name="title" defaultValue={formData.title} placeholder="제목을 입력해주세요"onChange={changeEvent} className="shadow text-gray-700 text-sm mb-2 border w-1/2 outline-none" />
            <textarea name="content" defaultValue={formData.content} placeholder="내용을 입력해주세요" onChange={changeEvent} className="shadow text-gray-700 text-sm mb-2 border w-full h-20 outline-none"></textarea>
            <button className='bg-green-400 text-white font-bold px-6 py-2 rounded shadow-md hover:text-black hover:bg-green-500 transition-all duration-150 focus:outline-none absolute top-[24px] ml-5'>
              등록
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

