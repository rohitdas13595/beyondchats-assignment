import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { settings } from "./lib/settings/settings";
import Google from "next-auth/providers/google";
import { toast } from "sonner";
import { makeGoogleUser } from "./lib/actions/auth.action";

export const { handlers, signIn, signOut, auth } = NextAuth({
  events: {
    async signIn(message: any) {
      /* on successful sign in */

      const { user, session } = message;

      console.log("from  router   handler -signIn", user, message);

      if (user) {
        await makeGoogleUser(user);
      }
    },
    async signOut(message: any) {
      /* on signout */
      console.log("from  router   handler -signOut", message);
    },
    async createUser(message: any) {
      const { user } = message;
      console.log("from  router   handler -createUser", user);
    },
    async updateUser(message: any) {
      /* user updated - e.g. their email was verified */
      console.log("from  router   handler -updateUser", message);
    },
    async linkAccount(message: any) {
      /* account (e.g. Twitter) linked to a user */
      console.log("from  router   handler -linkAccount", message);
    },
    async session(message: any) {
      /* session is active */
      console.log("from  router   handler -session", message);
    },
  },
  providers: [Google],
});
