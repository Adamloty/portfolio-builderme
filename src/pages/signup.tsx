// File: src/pages/signup.tsx
// pages/signup.tsx
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { api } from "src/utils/api"
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGoogle, FaLinkedin, FaTimes } from 'react-icons/fa'

export default function Signup() {
 const [name, setName] = useState('')
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')
 const [error, setError] = useState('')
 const [isLoading, setIsLoading] = useState(false)
 const [showModal, setShowModal] = useState(false)
 const router = useRouter()

 const createUser = api.user.create.useMutation({
  onSuccess: (data) => {
   console.log("Confirmation link:", data.confirmationLink);
   setIsLoading(false);
   setShowModal(true);
  },
  onError: (error) => {
   setIsLoading(false);
   console.error("Error creating user:", error);
   if (error.message.includes("already exists")) {
    setError("An account with this email already exists.");
   } else if (error.message.includes("expired")) {
    setError("The signup link has expired. Please try again.");
   } else {
    setError("An error occurred while creating your account. Please try again.");
   }
  }
 });

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setIsLoading(true);

  // Basic form validation
  if (!name || !email || !password) {
   setError("All fields are required.");
   setIsLoading(false);
   return;
  }

  if (password.length < 8) {
   setError("Password must be at least 8 characters long.");
   setIsLoading(false);
   return;
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
   setError("Please enter a valid email address.");
   setIsLoading(false);
   return;
  }

  createUser.mutate({ name, email, password });
 };

 const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
 }

 const Modal = () => (
  <AnimatePresence>
    {showModal && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold">Account Created!</h3>
            <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
              <FaTimes />
            </button>
          </div>
          <p className="mb-6">A confirmation email has been sent to your Gmail account. Please check your inbox and follow the instructions to verify your email.</p>
          <a
            href="https://mail.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <FaGoogle className="mr-2" /> Open Gmail
          </a>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
 );

 return (
  <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
   <Head>
    <title>Sign Up - PortfolioMaker</title>
    <meta name="description" content="Create your PortfolioMaker account" />
    <link rel="icon" href="/favicon.ico" />
   </Head>

   <Modal />

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
     Create your account
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
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                />
              </div>
            </div>

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
                  autoComplete="new-password"
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
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing up...' : 'Sign up'}
              </motion.button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or sign up with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  onClick={() => signIn('google')}
                >
                  <span className="sr-only">Sign up with Google</span>
                  <FaGoogle className="w-5 h-5" />
                </a>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  onClick={() => signIn('linkedin')}
                >
                  <span className="sr-only">Sign up with LinkedIn</span>
                  <FaLinkedin className="w-5 h-5" />
                </a>
              </motion.div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-purple-600 hover:text-purple-500">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
  </div>
 )
}
