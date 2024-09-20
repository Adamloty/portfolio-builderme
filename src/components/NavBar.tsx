import React from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

const NavBar: React.FC = () => {
  const { data: session } = useSession()

  return (
    <nav>
      <Link href="/">Home</Link>
      {session ? (
        <>
          <Link href="/dashboard">Dashboard</Link>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <Link href="/auth/signin">Sign in</Link>
      )}
    </nav>
  )
}

export default NavBar
