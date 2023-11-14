import { NextRequest, NextResponse } from "next/server";
import db from '@/db'
interface PostData{
  userid: string;
  username: string;
  title: string;
  content: string;
}

export const POST = async (
  req: NextRequest
) : Promise<NextResponse> =>{

  if(req.method === "POST"){
    try{
      
      const {userid, username, title, content} :PostData = JSON.parse(await req.text());
      //예외처리 국룰 > 정상적인 데이터를 먼저 처리하는 경우가 많음. 반대로 바꿔주면 됨.
      if(!userid || !username || !title || !content){
        return NextResponse.json({message: "데이터가 부족합니다."})}
      else{
        //select- 선택
        //insert - 입력
        // delete- 삭제
        // update - 수정
        const [results] = await db.query(
          'insert into jaewan.board (userid, username, title, content) values (?, ?, ?, ?)',[userid, username, title, content]
        )
        return NextResponse.json({message: "성공", result: results})
      }
      
    }catch(error){
      return NextResponse.json({error: "에러"})
    }
  }else{
    return NextResponse.json({error: "정상적인 데이터가 아닙니다"})
  }
}