import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Login from './components/login'
import Link from 'next/link'
import AuthSession from './session'

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

  return (
    <html lang="en">
      <body className={inter.className}>
        <button className='p-5'><Link href="/">홈</Link></button>
        <AuthSession>
          <Login />
          {children}
        </AuthSession>
      </body>
    </html>
  ) 
}
