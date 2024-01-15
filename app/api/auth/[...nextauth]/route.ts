import nextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

const handler = nextAuth({
    providers: [
        GoogleProvider({
            clientId: '456743225852-4rru9if491j7stua4bs988uqn581mcnh.apps.googleusercontent.com',
            clientSecret: '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',
        }),
        FacebookProvider({
            clientId: '886429626448261',
            clientSecret: '37e807fb55e4099b8f2746084f5b824a',
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
