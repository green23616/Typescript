interface userInfo{
  user:{
    name: string;
    email?: string;
    image?: string;
    level?: number;
  }
}

import { getServerSession } from 'next-auth';
import { signOut } from 'next-auth/react'
import Link from "next/link";
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function Login(){
  let sessions = await getServerSession(authOptions) as userInfo;
  const redirectTo = () =>{
    sessionStorage.setItem('preUrl', window.location.href);
    window.location.href = "/login"
  }
  return(
    <>
    {
      sessions && sessions.user.level === 10
      ? '관리자'
      : sessions && sessions.user !== null &&'일반회원'
    } 
    {
      sessions && sessions.user
      ? <>
        <span className='mr-5'>{sessions && sessions.user?.name}님 반갑습니다</span>
        <Link href="/logout">로그아웃</Link>
        </>
      : <div className="w-full border-b p-4">
        <div className="max-w-7xl mx-auto flex justify-between font-bold">
          <Link href="/login">로그인</Link>
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