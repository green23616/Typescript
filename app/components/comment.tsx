/*
const {data: session} = useCustomSession();
const data = {
  id: 5,
  name: "kjw",
  email : "abcd@gmail.com"
}
변수 내에 중괄호 {}가 들어가면 구조 분해 할당(destructuring assignment) > 해당 객체에서 그 속성을 추출해 새로운 변수로 할당할 때 사용
ex) data.id를 변수로 저장을 따로 하고 싶다면 const {id} = data > const id = 5가 남음
*/
'use client'
import React, { useEffect, useState } from "react";
import { useCustomSession } from "../sessions"
import { useParams } from "next/navigation";

interface CommentProps{
  id: number;
}
interface formType{
  parentid: number;
  userid: string;
  username: string;
  content: string;
}
interface CommentType{
  id: number;
  parentid: number;
  userid: string;
  username: string;
  content: string;
  date: string;
}

export default function Comment(props: CommentProps){
  const {id} = props;
  const {data: session} = useCustomSession();
  const [formData, setFormData] = useState<formType>({
    parentid: id,
    userid: session?.user?.email ?? '',
    username: session?.user?.name ?? '',
    content: ''
  })
  useEffect(()=>{
    setFormData({
      parentid: id,
      userid: session?.user?.email ?? '',
      username: session?.user?.name ?? '',
      content: ''
    })
  },[session?.user.name, session?.user.email, id])
  const commentValue = (e: React.ChangeEvent<HTMLInputElement>)=> {
    setFormData({...formData, [e.target.name] : e.target.value})
    // console.log(formData)
  }
  const [totalComment, setTotalComment] = useState<CommentType[]>();

  const params = useParams();
  // console.log(params)
  useEffect(()=>{
    const fetchData= async ()=>{
      const res = await fetch(`/api/comment?id=${params.id}`)
      const data = await res.json();
      setTotalComment(data.data);
    }
    fetchData()
  },[params.id])

  const cmtSubmit = async () =>{
    try{
      const res = await fetch('/api/comment',{
        method : "POST",
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(formData)
      })
      if(res.ok){
        const data = await res.json();
        // console.log(data)
        setTotalComment(data.data)
      }
    }catch(error){
      console.log(error)
    }
  }
  return (
    <>
    {
      session && session.user &&
      <>
      <p>댓글목록</p>
      {
        totalComment && totalComment.map((e,i)=>{
            const date = new Date(e.date);
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            const hours = (date.getHours()+9).toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const seconds = date.getSeconds().toString().padStart(2, '0');
            const formatDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
          return(
            <React.Fragment key={i}>
            <p>{e.content}{formatDate}</p>
            </React.Fragment>
          )
        })
      }
      <input type="text" name="content" className="border-blue-500 p-3 rounded" onChange={commentValue}/>
      <button onClick={cmtSubmit}>확인</button>
      </>
    }
    </>
  )
}