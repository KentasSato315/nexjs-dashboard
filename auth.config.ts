import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        // リクエストがNext.jsミドルウェア経由でページにアクセスすることを許可されているかどうかを確認する。リクエストが完了する前に呼び出される
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        },
    },
    // ログインオプションを列挙する配列
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;