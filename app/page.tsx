import db from '@/db';
import { RowDataPacket } from 'mysql2/promise';
import Link from 'next/link';
import 'dotenv/config'
import { connect } from '@planetscale/database'
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';

interface userInfo{
  user:{
    name: string;
    email?: string;
    image?: string;
    level?: number;
  }
}

export default async function Home() {
    const page = 1;
    const perPage = 5;
    const offset = (page - 1) * perPage;
    const config = {
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD
    }
    const conn = connect(config)
  
    const [result] = await db.query<RowDataPacket[]>('select * from jaewan.board order by date desc limit ? offset ?',[perPage, offset]);
    // offset > 10개 건너뜀. 페이지를 바꾼다는 개념.
    //  desc/asc 오름차순/내림차순

    console.log(result)
  
    let sessions = await getServerSession(authOptions) as userInfo;
    
  return (
    <>
    <div className="mx-auto max-w-7xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className='text-2xl font-semibold'>게시판</h1>
        {
          sessions && <Link href="/write" className='bg-green-400 text-white font-bold px-4 py-2 rounded shadow-md hover:text-black hover:bg-green-500 transition-all duration-150'>글쓰기</Link>
        }
      </div>
      <div className="bg-white shadow-md rounded-lg">
        <div className="bg-white">
          <ul className="bg-gray-100 flex justify-between">
            <li className="px-6 basis-1/6 py-3 text-center">번호</li>
            <li className="px-6 basis-1/2 py-3 text-center">제목</li>
            <li className="px-6 basis-1/6 py-3 text-center">작성자</li>
            <li className="px-6 basis-1/6 py-3 text-center">작성일</li>
          </ul>
          {
            result && result.map((e,i)=>{
              
              const date = new Date(e.date);
              const year = date.getFullYear();
              const month = (date.getMonth() + 1).toString().padStart(2, '0');
              const day = date.getDate().toString().padStart(2, '0');
              const formatDate = `${year}-${month}-${day}`
              
              return(
                <ul key={i} className='flex justify-between'>
                  <li className="px-6 basis-1/6 py-3 text-center">{result.length - i}</li>
                  <li className="px-6 basis-1/2 py-3 text-center"><Link href={`/post/${e.id}`}>{e.title}</Link></li>
                  <li className="px-6 basis-1/6 py-3 text-center">{e.author}</li>
                  <li className="px-6 basis-1/6 py-3 text-center">{formatDate}</li>
                </ul>
              )
            })
          }
        </div>
      </div>  
    </div>
    </>
  )
}
