import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
import { cacheGet, cacheSet } from "@/lib/cache";
import { JWT } from "next-auth/jwt";

// This Map will store promises for ongoing token refresh requests.
// It acts as an in-memory mutex for a single Next.js instance.
// For multi-instance deployments (e.g., Vercel, Kubernetes), this would need
// to be replaced with a distributed locking mechanism (e.g., Redis).

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const response = await fetch("https://tech-commerce.fractalsgroup.net/api/login", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 'email': credentials?.email, 'password': credentials?.password })
                });

                if (!response.ok) throw new Error(response.status === 401 ? 'Invalid credentials' : 'something went wrong please try again later');
                const user = await response.json();
                if (user) {
                    return user;
                }
                return null;
            },
        }),
    ],
    pages: {
        signIn: '/auth/sign-in'
    },
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                // Initial login or user update
                token.token = user.token;
                token.expires_at = user.expires_at;
            }
            // Check if the token needs refreshing
            const currentAccessToken = token.token as string;
            if (!currentAccessToken) {

                return token;
            }

            const { exp } = jwtDecode(currentAccessToken);
            const expirationDate = new Date(exp! * 1000);

            // If the token is still valid, return it.
            if (Date.now() < expirationDate.getTime()) {
                console.log('Token is still valid, no refresh needed.');
                return token;
            }


            const { jti } = jwtDecode(token.token)

            const cahcedToken = await cacheGet(jti!)

            if (cahcedToken) {
                const { exp } = jwtDecode(cahcedToken as string);
                const expirationDate = new Date(exp! * 1000);


                const newToken = {
                    ...token,
                    token: cahcedToken,
                    expires_at: new Date(expirationDate).toISOString(),
                }

                return newToken
            }
            try {
                return await refreshToken(token);
            } catch (error) {
                console.error("Error refreshing token: ", error);
                // Return the existing token with an added 'error' flag
                // This will signal the session callback to log the user out or show an error
                return null as unknown as JWT
            }

        },
        async session({ session, token }) {

            session.user.token = token.token;
            session.user.expires_at = token.expires_at;
            // Propagate the error from the token to the session if refresh failed

            return session;
        },
    },

};

async function refreshToken(token: JWT) {

    const res = await fetch("https://tech-commerce.fractalsgroup.net/api/refresh", {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token.token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });

    if (res.ok) {
        const refreshedTokens = await res.json();

        const { jti } = jwtDecode(token.token)


        await cacheSet(jti!, refreshedTokens.token, 8)
        return {
            ...token,
            token: refreshedTokens.token,
            expires_at: refreshedTokens.expires_at
        };
    }
    console.error('refreshing token faild')
    // If refresh fails, throw an error to be caught by the jwt callback.
    throw new Error('refreshed token faild')
}
