import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { NextComponentType, NextPageContext } from 'next';

// Define a type that includes getInitialProps
type ComponentTypeWithGetInitialProps = NextComponentType<NextPageContext, any, {}> & {
  getInitialProps?: (context: NextPageContext) => Promise<any>;
};

// Update the ComponentType to include the new type
type ComponentType = ComponentTypeWithGetInitialProps | React.ComponentType<any>;

// Define the type for the HOC
const withAuth = <P extends object>(WrappedComponent: ComponentType): React.FC<P> => {
  const WithAuth: React.FC<P> & { getInitialProps?: ComponentTypeWithGetInitialProps['getInitialProps'] } = (props) => {
    const router = useRouter();
    const { data: session, status } = useSession();
    const isUser = !!session?.user;

    React.useEffect(() => {
      if (status === "loading") return; // Do nothing while loading
      if (!isUser) router.push("/auth/signin");
    }, [isUser, status, router]);

    if (isUser) {
      return <WrappedComponent {...props} />;
    }

    // Session is being fetched, or no user.
    // If no user, useEffect() will redirect.
    return null;
  };

  // Safely copy getInitialProps if it exists
  if ('getInitialProps' in WrappedComponent && typeof WrappedComponent.getInitialProps === 'function') {
    WithAuth.getInitialProps = WrappedComponent.getInitialProps;
  }

  return WithAuth;
};

export default withAuth;
