'use client'
export default function Login(){
  const redirectTo = ()=>{
    sessionStorage.setItem('preUrl', window.location.href);
    window.location.href = "/login"
  }
  return(
    <button onClick={redirectTo}>Login</button>
  )
}