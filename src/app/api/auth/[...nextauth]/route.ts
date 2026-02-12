import NextAuth from "next-auth"
import { authOptions } from "@/app/auth"

// Create the NextAuth handler using the shared options and export the
// App Router-compatible request handlers. Use re-export syntax so the
// same handler function is used for both GET and POST.
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }