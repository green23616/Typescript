import { headers } from 'next/headers';

export default async function notFound(){
  const headerList = headers();
  const domain = headerList.get('referer');
  // const data = await getSiteData(domain);
  console.log(headerList.get('referer'))

  return(
    <>
    <p className="text-7xl font-bold text-center mt-80">입력하신 {domain}은 없는 페이지입니다.</p>
    </>
  )
}