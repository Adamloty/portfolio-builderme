// File: src/server/api/routers/user.ts
import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "src/server/api/trpc";
import { hash } from "bcryptjs";
import { TRPCError } from "@trpc/server";
import { v4 as uuidv4 } from 'uuid';

export const userRouter = createTRPCRouter({
  
  getUser: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { id: input.id },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          // Add any other fields you want to return
        },
      });
      return user;
    }),

  create: publicProcedure
    .input(z.object({ 
      name: z.string().min(1, "Name is required"), 
      email: z.string().email("Invalid email address"), 
      password: z.string().min(8, "Password must be at least 8 characters long")
    }))
    .mutation(async ({ input, ctx }) => {
      const { name, email, password } = input;

      // Check if user already exists
      const existingUser = await ctx.prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "An account with this email already exists.",
        });
      }

      const hashedPassword = await hash(password, 12);

      const user = await ctx.prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      const token = uuidv4();
      const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now

      await ctx.prisma.verificationToken.create({
        data: {
          identifier: email,
          token,
          expires,
        },
      });

      const confirmationLink = `http://localhost:3000/api/confirm-email?token=${token}`;

      // In a real application, you would send an email here
      console.log("Confirmation link:", confirmationLink);

      return { user, confirmationLink };
    }),

  // Add a protected procedure to get the subscription status
  subscriptionStatus: protectedProcedure
    .query(async ({ ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { id: ctx.session.user.id },
        select: { stripeSubscriptionStatus: true },
      });

      return user?.stripeSubscriptionStatus || null;
    }),

  // You can add more user-related procedures here as needed
});
