import db from '@/db'
import { NextRequest, NextResponse } from 'next/server'
import { RowDataPacket } from 'mysql2/promise'

export const GET = async (req:NextRequest) :Promise<NextResponse> =>{ 
  const pathname = req.nextUrl.pathname;
  const postId = pathname.split('/').pop()
  const [results] = await db.query<RowDataPacket[]>('SELECT * FROM jaewan.board where id = ?',[postId])
// ${postId} 이거 아님 xxxxxx nextjs문법은 이렇게 써야 함
  return NextResponse.json({data: results})
}

export const POST = async (req:NextRequest) :Promise<NextResponse> =>{
  if(req.method === "POST"){
    return NextResponse.json({message: "성공"})
  }else{
    return NextResponse.json({message: "에러"})
  }
}