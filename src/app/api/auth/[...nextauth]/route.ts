// Acá va a estar la pagina del loging.

import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"


// objeto de configuracion
const handler = NextAuth({
    providers: [
        GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
],
});
//  Las variables de entorno las creo en .env.local.
//  lo exporto
export {handler as GET, handler as POST}