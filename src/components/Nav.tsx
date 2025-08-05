import Link from "next/link"
import React from "react"

const navLinks = [
    { name: "Home", link: "/" },
    { name: "Quiz", link: "/quiz" },
    { name: "Jokes", link: "/jokes" },
    { name: "Sign Up", link: "/signup" },
]

const Nav = () => {
    return (
        <nav>
            <div className="px-4 flex justify-between items-center">
                <div>
                    <Link
                        href={"/"}
                        className="block audiowide my-2 py-2 px-4 border border-foreground/20 rounded-sm text-3xl bg-foreground/5 duration-100 hover:border-foreground/40 hover:bg-foreground/10"
                    >
                        Ü
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    {navLinks.map((link) => (
                        <Link key={link.link} href={link.link} className="font-semibold">
                            {link.name}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    )
}

export default Nav
