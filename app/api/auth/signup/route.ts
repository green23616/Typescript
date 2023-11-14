import { NextRequest, NextResponse } from 'next/server';
import db from '@/db';
import bcrypt from 'bcrypt'
import { RowDataPacket } from 'mysql2';

interface formType{
  email: string;
  password: string;
  name: string;
}

export const POST = async (
  req: NextRequest
) : Promise<NextResponse>=>{
  if(req.method === 'POST'){
    const {email, password, name}: formType = JSON.parse(await req.text());
    const hash = await bcrypt.hash(password, 10);
    console.log(hash)
    const [chkMember] = await db.query<RowDataPacket[]>('select count(*) as cnt from jaewan.member where email = ?', [email])
    const memberCnt = chkMember[0].cnt;
    
    if(!email || !password || !name){
      return NextResponse.json({message: "데이터가 부족합니다."})
    }
    
    if(memberCnt > 0){
      return NextResponse.json({message: "이미 있는 이메일입니다"})
    }else{
      await db.query('insert into jaewan.member (email, password, name) values(?, ?, ?)',[email, hash, name]);
      const data = {
        email: email,
        password: password
      }
      return NextResponse.json({message: "성공", data: data})
    }    
  }else{
    return NextResponse.json({error: "실패"})
  }
}