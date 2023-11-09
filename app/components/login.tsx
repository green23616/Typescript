'use client'

interface userInfo{
  name: string;
  email: string;
  image: string;
}
interface PropsData{
  session?:userInfo | null
}

import { signIn, signOut } from 'next-auth/react'

export default function Login({session} :PropsData){
  return(
    <>
    {
      session && session.user?.email
      ? <button onClick={()=>{signOut()}}>로그아웃</button>
      : <button onClick={()=>{signIn()}}>로그인</button>
    }
    <div className="w-full border-b p-4">
      <div className="max-w-7xl mx-auto flex justify-between font-bold text-2xl">
        <button onClick={()=>{signIn()}}>통합 Login</button>
        <button onClick={()=>{signIn('kakao')}}>Kakao</button>
        <button onClick={()=>{signIn('google')}}>Google</button>
        <button onClick={()=>{signIn('github')}}>Github</button>
        <button onClick={()=>{signIn('naver')}}>Naver</button>
      </div>
    </div>
    </>
  )
}