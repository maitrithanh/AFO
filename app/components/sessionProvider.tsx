"use client"
import { SessionProvider } from "next-auth/react";

interface Props { 
    children: React.ReactNode
}

const Provider = (p: Props) => { 
    return <SessionProvider>
        {p.children}
    </SessionProvider>
}

export default Provider