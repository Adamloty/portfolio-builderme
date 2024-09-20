import { GetServerSideProps } from 'next'
import { getProviders, signIn, ClientSafeProvider } from "next-auth/react"
import Layout from '../../components/Layout'

interface SignInProps {
  providers: Record<string, ClientSafeProvider> | null
}

export default function SignIn({ providers }: SignInProps) {
  return (
    <Layout>
      <h1>Sign In</h1>
      {providers ? (
        Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button onClick={() => signIn(provider.id)}>
              Sign in with {provider.name}
            </button>
          </div>
        ))
      ) : (
        <p>No providers available</p>
      )}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<SignInProps> = async () => {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}
