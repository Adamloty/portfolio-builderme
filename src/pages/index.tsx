// File: src/pages/index.tsx
import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/react'
import { api } from "src/utils/api"

export default function Landing() {
 const [email, setEmail] = useState('')
 const router = useRouter()
 const { data: session, status } = useSession()
 const [user, setUser] = useState(null)

 const { data: userData, isLoading } = api.user.getUser.useQuery(
   { id: router.query.userId as string },
   { enabled: !!router.query.userId }
 )

 useEffect(() => {
   if (router.query.verified === 'true' && userData) {
     setUser(userData)
     signIn('credentials', { 
       email: userData.email, 
       callbackUrl: '/',
       redirect: false 
     }).then((result) => {
       if (result?.error) {
         console.error('Sign in error:', result.error)
       }
     })
   } else if (session) {
     setUser(session.user)
   }
 }, [router.query, userData, session])

 return (
  <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
   <Head>
    <title>PortfolioMaker - Create stunning portfolios in minutes</title>
    <meta name="description" content="Build professional portfolios with ease using our intuitive webapp" />
    <link rel="icon" href="/favicon.ico" />
   </Head>

   <header className="container mx-auto px-4 py-8">
    <nav className="flex justify-between items-center">
     <Image src="/logo.svg" alt="PortfolioMaker Logo" width={180} height={40} />
     <div className="space-x-4">
      <a href="#features" className="text-gray-600 hover:text-purple-600">Features</a>
      <a href="#pricing" className="text-gray-600 hover:text-purple-600">Pricing</a>
      <a href="#contact" className="text-gray-600 hover:text-purple-600">Contact</a>
      {user ? (
        <div className="flex items-center">
          {user.image && (
            <img src={user.image} alt="User Avatar" className="w-10 h-10 rounded-full mr-2" />
          )}
          <span className="text-purple-600">Welcome, {user.name}!</span>
        </div>
      ) : (
        <a href="/login" className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">Login</a>
      )}
     </div>
    </nav>
   </header>

   <main>
    <section className="container mx-auto px-4 py-16 text-center">
     <h1 className="text-5xl font-bold mb-6">Create Your Dream Portfolio in Minutes</h1>
     <p className="text-xl text-gray-600 mb-8">Showcase your work with a professional, customizable portfolio. No coding required.</p>
     <a href="/signup" className="bg-purple-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-purple-700">Get Started for Free</a>
    </section>

    <section id="features" className="bg-white py-16">
     <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Why Choose PortfolioMaker?</h2>
      <div className="grid md:grid-cols-3 gap-8">
       <FeatureCard 
        icon="🎨"
        title="Beautiful Templates"
        description="Choose from a wide range of professionally designed templates to suit your style."
       />
       <FeatureCard 
        icon="🚀"
        title="Easy Customization"
        description="Personalize your portfolio with our intuitive drag-and-drop interface."
       />
       <FeatureCard 
        icon="📱"
        title="Responsive Design"
        description="Your portfolio will look great on all devices, from desktop to mobile."
       />
      </div>
     </div>
    </section>

    <section id="pricing" className="py-16">
     <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Simple, Transparent Pricing</h2>
      <div className="grid md:grid-cols-3 gap-8">
       <PricingCard 
        title="Basic"
        price="Free"
        features={['1 Portfolio', 'Basic Templates', 'Limited Customization']}
       />
       <PricingCard 
        title="Pro"
        price="$9.99/mo"
        features={['Unlimited Portfolios', 'Premium Templates', 'Advanced Customization', 'Custom Domain']}
        highlighted={true}
       />
       <PricingCard 
        title="Enterprise"
        price="Contact Us"
        features={['All Pro Features', 'Priority Support', 'Team Collaboration', 'Analytics']}
       />
      </div>
     </div>
    </section>

    <section id="contact" className="bg-purple-100 py-16">
     <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold mb-8">Ready to Get Started?</h2>
      <p className="text-xl text-gray-600 mb-8">Join thousands of professionals who trust PortfolioMaker for their online presence.</p>
      <form onSubmit={(e) => { e.preventDefault(); console.log('Form submitted:', email); }} className="max-w-md mx-auto">
       <input 
        type="email" 
        placeholder="Enter your email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-600"
        required
       />
       <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded-r-md hover:bg-purple-700">
        Get Early Access
       </button>
      </form>
     </div>
    </section>
   </main>

   <footer className="bg-gray-100 py-8">
    <div className="container mx-auto px-4 text-center text-gray-600">
     <p>&copy; 2023 PortfolioMaker. All rights reserved.</p>
    </div>
   </footer>
  </div>
 )
}

function FeatureCard({ icon, title, description }) {
 return (
  <div className="bg-purple-50 p-6 rounded-lg text-center">
   <div className="text-4xl mb-4">{icon}</div>
   <h3 className="text-xl font-semibold mb-2">{title}</h3>
   <p className="text-gray-600">{description}</p>
  </div>
 )
}

function PricingCard({ title, price, features, highlighted = false }) {
 return (
  <div className={`border rounded-lg p-6 ${highlighted ? 'border-purple-600 shadow-lg' : 'border-gray-200'}`}>
   <h3 className="text-2xl font-bold mb-4">{title}</h3>
   <p className="text-4xl font-bold mb-6">{price}</p>
   <ul className="space-y-2 mb-8">
    {features.map((feature, index) => (
     <li key={index} className="flex items-center">
      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
      {feature}
     </li>
    ))}
   </ul>
   <button className={`w-full py-2 rounded-md ${highlighted ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-opacity-90`}>
    Choose Plan
   </button>
  </div>
 )
}
