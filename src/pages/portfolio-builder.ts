import React from 'react';
import { useSession } from 'next-auth/react';
import { DefaultSession } from 'next-auth';
import Layout from '../components/Layout';

const PortfolioBuilder: React.FC = () => {
  const { data: session, status } = useSession();

  const content = React.useMemo(() => {
    switch (status) {
      case 'loading':
        return <p>Loading...</p>;
      case 'unauthenticated':
        return <p>Access Denied</p>;
      case 'authenticated':
        return (
          <>
            <h1>Portfolio Builder</h1>
            <p>Welcome, {(session?.user as DefaultSession['user'])?.name || 'User'}! Build your portfolio here.</p>
            {/* Add portfolio building components */}
          </>
        );
      default:
        return <p>An error occurred</p>;
    }
  }, [status, session]);

  return <Layout>{content}</Layout>;
};

export default PortfolioBuilder;
