// import { settings } from "@/lib/settings/settings";
// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// export const authOptions = {
//   events: {
//     async signIn(message: any) {
//       /* on successful sign in */

//       const { user } = message;
//       console.log("from  router   handler -signIn", user);
//     },
//     async signOut(message: any) {
//       /* on signout */
//       console.log("from  router   handler -signOut", message);
//     },
//     async createUser(message: any) {
//       const { user } = message;
//       console.log("from  router   handler -createUser", user);
//     },
//     async updateUser(message: any) {
//       /* user updated - e.g. their email was verified */
//       console.log("from  router   handler -updateUser", message);
//     },
//     async linkAccount(message: any) {
//       /* account (e.g. Twitter) linked to a user */
//       console.log("from  router   handler -linkAccount", message);
//     },
//     async session(message: any) {
//       /* session is active */
//       console.log("from  router   handler -session", message);
//     },
//   },
//   providers: [
//     GoogleProvider({
//       clientId: settings.googleClientId,
//       clientSecret: settings.googleClientSecret,
//       authorization: {
//         params: {
//           prompt: "consent",
//           access_type: "offline",
//           response_type: "code",
//         },
//       },
//     }),
//   ],
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

import { handlers } from "@/auth"; // Referring to the auth.ts we just created
export const { GET, POST } = handlers;
