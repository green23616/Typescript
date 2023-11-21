import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import Logout from './logout';
import Login from './login';
interface userInfo{
  user:{
      name:string;
      email:any;
      password: string;
      level: number
  }
}
export default async function Nav(){
  let sessions = await getServerSession(authOptions) as userInfo;
  
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
        <Logout/>
        <span className='mr-5'>{sessions && sessions.user?.name}님 반갑습니다</span>
        </>
      : <div className="w-full border-b p-4">
        <div className="max-w-7xl mx-auto flex justify-between font-bold">
        <Login/>
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

