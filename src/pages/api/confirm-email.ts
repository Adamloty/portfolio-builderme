// File: src/pages/api/confirm-email.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "src/server/db";
import { signIn } from "next-auth/react";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token } = req.query;

  if (!token || typeof token !== 'string') {
    return res.status(400).json({ error: 'Invalid token' });
  }

  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!verificationToken) {
      return res.status(400).json({ error: 'Invalid token' });
    }

    if (verificationToken.expires < new Date()) {
      await prisma.verificationToken.delete({ where: { token } });
      return res.status(400).json({ error: 'Token has expired' });
    }

    const user = await prisma.user.update({
      where: { email: verificationToken.identifier },
      data: { emailVerified: new Date() },
    });

    await prisma.verificationToken.delete({ where: { token } });

    // Instead of returning a JSON response, redirect to the landing page
    // with a special query parameter
    res.redirect(302, `/landing?verified=true&userId=${user.id}`);
  } catch (error) {
    console.error('Error confirming email:', error);
    return res.status(500).json({ error: 'An error occurred while confirming the email' });
  }
}
