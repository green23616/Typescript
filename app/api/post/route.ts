import db from '@/db';
import { NextRequest, NextResponse } from 'next/server';
// import { NextApiRequest, NextApiResponse } from 'next'; 시간나면 알아보기
import { RowDataPacket } from 'mysql2/promise';

export const GET = async (
  req: NextRequest,
  res: NextResponse
) : Promise<NextResponse> =>{

  if(req.method === 'GET'){

    const page = Number(req.nextUrl.searchParams.get('page') || 1);
    const perPage = 4;
    const offset = (page - 1) * perPage;
    
    try{
      const [results] = await db.query<RowDataPacket[]>('select * from jaewan.board order by date desc limit ? offset ?',[perPage, offset]);
      // offset > 10개 건너뜀. 페이지를 바꾼다는 개념.
      //  desc/asc 오름차순/내림차순
      const [countResult] = await db.query<RowDataPacket[]>('select count(*) as cnt from sakila.film')
      const totalCnt = countResult[0].cnt
      console.log(results)
      return NextResponse.json({message: "성공", results, totalCnt, page, perPage})
    }catch(error){
      return NextResponse.json({error: error})
    }
  }

  return NextResponse.json({error: "에러가 발생하였습니다."})
}