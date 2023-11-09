import db from '@/db'
import { RowDataPacket } from 'mysql2/promise';
import Link from 'next/link';

interface editProps{
  params: {
    id: string;
  }
}

export default async function Edit(props:editProps){
  const [results] = await db.query<RowDataPacket[]>('select * from jaewan.board where id = ?',[props.params.id]);
  console.log(results[0])
  // results[0].author 이렇게 출력하면 됨.
  // 'update jaewan.board set title=?, content=? where id = ?',[title, content, id]
  // 
  return(
    <>
    {
      results.length > 0 
      ? <Data result={results}/>
      : <NoData/>
    }
    </>
  )
}

function Data(result:any){

  return(
    <>
    <div className="w-full">
      <div className="max-w-7xl mx-auto">
        <div className="flex ml-64 mt-64 relative">

          <Link href="/" className="w-20 h-10 bg-red-400 text-white font-bold px-4 py-2 rounded shadow-md hover:text-black hover:bg-orange-500 transition-all duration-150 focus:outline-none text-center mr-5 mt-5">취소</Link>
          <form method="post">
            <input type="text" name="name" placeholder="이름을 입력해주세요" className="shadow text-gray-700 text-sm mb-2 border w-1/2 outline-none"/>
            <input type="text" name="title" placeholder="제목을 입력해주세요" className="shadow text-gray-700 text-sm mb-2 border w-1/2 outline-none"/>
            <textarea name="content"placeholder="내용을 입력해주세요"className="shadow text-gray-700 text-sm mb-2 border w-full h-20 outline-none"></textarea>
            <button className='bg-violet-400 text-white font-bold px-6 py-2 rounded shadow-md hover:text-black hover:bg-green-500 transition-all duration-150 focus:outline-none absolute top-[24px] ml-5'>
              수정
            </button>
          </form>
        </div>
      </div>
    </div>
    </> 
  )
}

function NoData(){
  return(
    <>
    <p className='text-center text-7xl text-red-500 mt-80'>데이터가 존재하지 않습니다</p>
    <Link href="/" className='text-2xl border p-5 rounded'>돌아가기</Link>
    </>   
  )
}