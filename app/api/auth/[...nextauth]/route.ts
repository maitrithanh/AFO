import nextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

const handler = nextAuth({
    providers: [
        GoogleProvider({
            clientId: '339503009199-73rta2opicd25l89kl8qanol7ftstuhs.apps.googleusercontent.com',
            clientSecret: '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',
        }),
        FacebookProvider({
            // clientId: '886429626448261',
            // clientSecret: '37e807fb55e4099b8f2746084f5b824a',
            clientId: '950600633373138',
            clientSecret: 'd8bc0a20070c63920ede9052380afdba',
        })
    ],
    callbacks: {
        async session({ session, token }) {
            session.token = token.id_token;
            session.access_token = token.access_token
            return session;
        },
        async jwt({ token, account }) {
            if (account) {
                token.id_token = account.id_token;
                token.access_token = account.access_token
            }
            return token;
        },
        
    },
    secret: 'aQexBUXdGCUadRwjsEXmmGmEmAPfkC1y'
})

export { handler as POST, handler as GET }
