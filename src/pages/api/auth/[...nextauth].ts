import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const GITHUB_ID: any = process.env.GITHUB_ID;
const GITHUB_SECRET: any = process.env.GITHUB_SECRET;

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
    }),
  ],
});
