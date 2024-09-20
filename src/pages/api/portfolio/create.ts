import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import prisma from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method === 'POST') {
    try {
      const { title, description } = req.body
      const portfolio = await prisma.portfolio.create({
        data: {
          title,
          description,
          userId: session.user.id,
        },
      })
      res.status(201).json(portfolio)
    } catch (error) {
      res.status(500).json({ error: 'Failed to create portfolio' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
