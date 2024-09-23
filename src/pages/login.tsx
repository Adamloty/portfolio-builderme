// File: src/pages/login.tsx
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { FaGoogle, FaLinkedin } from 'react-icons/fa'
import { api } from "src/utils/api"

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const { data: session } = useSession()

  const { data: userData, refetch: refetchUser } = api.user.getUser.useQuery(
    { id: '' }, // Initially empty string
    { enabled: false } // This prevents the query from running automatically
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
  
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })
  
    if (result?.error) {
      setError('Invalid email or password')
    } else if (result?.ok) {
      const userId = result.url?.split('userId=')[1]
      if (userId) {
        try {
          await refetchUser({ id: userId })
          router.push('/')
        } catch (error) {
          console.error('Error fetching user data:', error)
          setError('Error fetching user data')
        }
      }
    }
  }
  
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  }

  // If user is already logged in, redirect to landing page
  if (session) {
    router.push('/')
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Head>
        <title>Login - PortfolioMaker</title>
        <meta name="description" content="Login to your PortfolioMaker account" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <motion.div 
        className="sm:mx-auto sm:w-full sm:max-w-md"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <Image 
          src="/logo.svg" 
          alt="PortfolioMaker Logo" 
          width={180} 
          height={40} 
          className="mx-auto"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </motion.div>

      <motion.div 
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Sign in
              </motion.button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  onClick={() => signIn('google')}
                >
                  <span className="sr-only">Sign in with Google</span>
                  <FaGoogle className="w-5 h-5" />
                </a>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  onClick={() => signIn('linkedin')}
                >
                  <span className="sr-only">Sign in with LinkedIn</span>
                  <FaLinkedin className="w-5 h-5" />
                </a>
              </motion.div>
            </div>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Don't have an account?</span>
              </div>
            </div>
            <div className="mt-6 text-center">
              <Link href="/signup" className="font-medium text-purple-600 hover:text-purple-500">
                Sign up here
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
