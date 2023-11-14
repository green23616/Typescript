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
import { useState } from "react";
import { useCustomSession } from "../sessions"

interface CommentProps{
  id: number;
}

export default function Comment(props: CommentProps){
  const {id} = props;
  const [comment, setComment] = useState<string>('');
  const commentValue = (e: React.ChangeEvent<HTMLInputElement>)=> {
    setComment(e.target.value);
  }
  const {data: session} = useCustomSession();
  const cmtSubmit = async () =>{
    try{
      const res = await fetch('',{
        method : "POST",
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(comment)
      })
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
      <p>{comment}</p>
      <input type="text" className="border-blue-300 p-3 rounded" onChange={commentValue}/>
      <button className="" onClick={cmtSubmit}>확인</button>
      </>
    }
    </>
  )
}