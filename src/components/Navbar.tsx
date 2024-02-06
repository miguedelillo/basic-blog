"use client"

import Link from "next/link";
import { signIn, useSession, signOut} from "next-auth/react";
import Image from "next/image";
function Navbar() {

    const {data: session} = useSession()
    return (
        <nav className="bg-slate-900 flex justify-between px-20 py-3 text-white items-center">
            <Link href="/">
                <h1>
                    Basic-Blog
                </h1>
            </Link>

            {session?.user ? (
                <div className="flex gap-x-2 items-center">
                    <Link href="/dashboard">
                        DashBoard
                    </Link>
                    <p>{session.user.name} {session.user.email}</p>
                    {/* <Image                              No lo pude hacer andar
                        src={session.user.image as string}
                        width={10}
                        height={10}
                        alt="Picture of the author"
                    />  */}
                    <button onClick={async () => await signOut({
                        callbackUrl:"/"
                    }
                    )}> 
                        Cerrar sesión
                    </button>
                </div>
            ) : (
                <button onClick={() => signIn()} className="bg-sky-400 px-3 py-2 rounded"> 
                    Iniciar sesión
                </button>
            )}
            
        </nav>
    )
}

export default Navbar;