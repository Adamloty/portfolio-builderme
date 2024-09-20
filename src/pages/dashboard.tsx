import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading
    if (!session) {
      router.push('/auth/signin');
    } else {
      // Check if user has filled out the form
      fetch(`/api/user-status?userId=${session.user.id}`)
        .then(res => res.json())
        .then(data => {
          if (data.hasFilledForm) {
            router.push('/portfolio-builder');
          } else {
            router.push('/form');
          }
        });
    }
  }, [session, status, router]);

  return <div>Loading...</div>;
};

export default Dashboard;
