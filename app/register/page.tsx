'use client'

import { signIn } from "next-auth/react";
import { useState } from "react";

interface formType{
  email: string;
  password: string;
  name: string;
}

export default function Register(){

  const [formData, setFormData] = useState<formType>({
    email: '',
    password: '',
    name: ''
  })
  const [message, setMessage] = useState<string>();
  const changeEvent = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setFormData({
      ...formData, [e.target.name] :e.target.value
    })
    console.log(formData)
  }
  const submitEvent = async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    try{
      const res = await fetch('/api/auth/signup', {
        method: "POST",
        headers:{
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(formData)
      })
      if(res.ok){
        const data = await res.json();
        const result = data.data;
        if(data.message === "성공"){
          alert('회원가입이 완료되었습니다.');
          signIn('credentials',{
            email : result.email,
            password: result.password,
            callbackUrl: '/'
          })
        }
        console.log(data);
        setMessage(data.message);
      }
    }catch(error){
      console.log(error)
    }
  }

  return(
    <>
    {message}
      <form onSubmit={submitEvent} method="POST">
        <input onChange={changeEvent} type="text" placeholder="email" name="email" required/>
        <input onChange={changeEvent} type="password" placeholder="password" name="password" required/>
        <input onChange={changeEvent} type="text" placeholder="name" name="name" required/>
        <button type="submit">가입</button>
      </form>
    </>
  )
}