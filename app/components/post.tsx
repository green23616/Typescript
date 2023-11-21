'use client';
import React, { useEffect, useState } from 'react';
import Search from './search';

interface PostList{
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  count: number;
}

export default function Post(){

  const [posts, setPosts] = useState<PostList[]>([]);
  const [totalCnt, setTotalCnt] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  
  useEffect(()=>{
    const fetchData = async () =>{
      if(!page) return;
      // page가 있을때만 실행하라는 코드
      const res = await fetch(`api/post?page=${page}`);
      const data = await res.json();
      setPosts(data.results);
      // console.log(data)
      setTotalCnt(data.totalCnt)
    }
    fetchData()
  },[page])

  const lastPage = Math.ceil(totalCnt/ 10);
  const totalPageCtn = 5;
  const startPage = Math.floor((page - 1) / totalPageCtn) * totalPageCtn + 1;
  const endPage = Math.min(lastPage, startPage + totalPageCtn - 1);
  const nextPage = () => {
    const nextStart = Math.ceil((page + 1) / 5) * 5 + 1;
    setPage(nextStart)
  }
  const prevPage = () => {
    const prevStart = Math.floor((page + 1) / 5) * 5 - 4;
    setPage(prevStart)
  }
  // paginiation 국룰임 

  return(
    <>
    
    <div className="flex justify-center gap-x-5 m-5 bg-white">
      {page > 5 && <button className="border px-1.5 py-1 rounded text-sm" onClick={()=>{setPage(page - 5);prevPage}}>이전</button>}
      {
        Array(endPage - startPage + 1).fill(null).map((_,i)=>{
          const pageNumber = i + startPage
          return(
            <button key={i} className={`${page === pageNumber ? 'bg-blue-300 font-bold' : ''} px-1.5 py-1 rounded text-sm basis-8`} onClick={()=>{setPage(pageNumber)}}>{pageNumber}</button>
          )
        })
      }
      {page <= lastPage && <button className='border px-1.5 py-1 rounded text-sm' onClick={()=>{setPage(page + 5);nextPage}}>다음</button>}
    
    </div>
    </>
  )
}