import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Login from './components/login'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nextjs mySQL Dashboard',
  description: 'Nextjs mySQL Dashboard',
  icons: {
    icon: "/favicon.ico"
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(authOptions)
  console.log(session)
  return (
    <html lang="en">
      <body className={inter.className}>
        <button className='p-5'><Link href="/">홈</Link></button>
        <Login session={session} />
        {children}
      </body>
    </html>
  )
}
