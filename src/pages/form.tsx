import React, { useState, FormEvent } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

interface FormData {
  // Define your form fields here
  name?: string;
  email?: string;
  // Add other fields as necessary
}

const FormPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({});
  const { data: session } = useSession();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Send form data to API
    const response = await fetch('/api/submit-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, userId: session?.user?.id }),
    });

    if (response.ok) {
      router.push('/portfolio-builder');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  return (
    <Layout>
      <h1>User Information Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleInputChange}
        />
        {/* Add more form fields as needed */}
        <button type="submit">Submit</button>
      </form>
    </Layout>
  );
};

export default FormPage;
