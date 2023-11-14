'use client'

interface userInfo{
  name: string;
  email: string;
  image: string;
}

import { signOut } from 'next-auth/react'
import Link from "next/link";
import { useCustomSession } from '../sessions';

export default function Login(){
  const {data: session, status} = useCustomSession();
  const redirectTo = () =>{
    sessionStorage.setItem('preUrl', window.location.href);
    window.location.href = "/login"
  }
  return(
    <>
    
    {/* {
      session && session.user?.email
      ? <button onClick={()=>{signOut()}} className='mr-5'>로그아웃</button>
      : <button onClick={()=>{signIn()}} className='mr-5'>로그인</button>
    } */}
    {
      session && session.user.level === 10
      ? '관리자'
      : session && session.user !== null &&'일반회원'
    } 
    {
      status !== 'loading' && session && session.user?.email
      ? <>
        <span className='mr-5'>{session && session.user?.name}님 반갑습니다</span>
        <button onClick={()=>signOut()}>로그아웃</button>
        </>
      : <div className="w-full border-b p-4">
        <div className="max-w-7xl mx-auto flex justify-between font-bold">
          <button onClick={redirectTo}>Login</button>
          <Link href="/register">회원가입</Link>
          {/* <button onClick={()=>{signIn('kakao')}}>Kakao</button>
          <button onClick={()=>{signIn('google')}}>Google</button>
          <button onClick={()=>{signIn('github')}}>Github</button>
          <button onClick={()=>{signIn('naver')}}>Naver</button> */}
        </div>
      </div>
    }
    
    </>
  )
}