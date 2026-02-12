// src/middleware.ts
import { withAuth } from "next-auth/middleware";
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

// Define your public pages using a regex.
// This is easier to manage than a long list of "if" statements.
const publicPages = [
    '/auth/sign-in',
    '/auth/sign-up',
    '/pricing',
    '/about'
    // Add any other public pages here
];

const authMiddleware = withAuth(
    function middleware(req) {
        return intlMiddleware(req);
    },
    {
        callbacks: {
            authorized: ({ token }) => token != null,
        },
        pages: {
            signIn: "/auth/sign-in",
        },
    }
);

export default function middleware(req: NextRequest) {
    const publicPathnameRegex = RegExp(
        // The regex now matches any of the public pages, with an optional locale prefix
        `^(/(${routing.locales.join('|')}))?(${publicPages.join('|')})/?$`,
        'i'
    );
    const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

    // Also exclude API routes from processing
    const isApiRoute = req.nextUrl.pathname.startsWith('/api');

    if (isPublicPage || isApiRoute) {
        // If it's a public page or an API route, only run the i18n middleware
        return intlMiddleware(req);
    } else {
        // For all other pages, run the auth middleware which then chains to i18n
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (authMiddleware as any)(req);
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
