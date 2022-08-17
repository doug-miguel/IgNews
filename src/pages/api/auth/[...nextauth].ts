import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

import { query as q } from "faunadb";

import { fauna } from "../../../services/fauna";

const GITHUB_ID: any = process.env.GITHUB_ID;
const GITHUB_SECRET: any = process.env.GITHUB_SECRET;

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const { email } = user;
      try {
        await fauna.query(q.Create(q.Collection("users"), { data: { email } }));
        return true;
      } catch {
        return false;
      }
    },
  },
});
