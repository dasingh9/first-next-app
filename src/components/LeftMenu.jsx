'use client'
import Link from "next/link"
import { usePathname } from 'next/navigation'

export default function LeftMenu() {
    const path = usePathname(); // hook to check current path

    return (
        <div className="left-menu">
            <div className="menu-item"><Link href="/">Home</Link></div>
            <div className="menu-item"><Link href="./dashboard" className={path.startsWith('/dashboard') ? 'active' : null}>Dashboard</Link></div>
            <div className="menu-item"><Link href="./about" className={path.startsWith('/about') ? 'active' : null}>About</Link></div>
            <div className="menu-item"><Link href="./profile" className={path.startsWith('/profile') ? 'active' : null}>Profile</Link></div>
            <div className="menu-item"><Link href="./users" className={path.startsWith('/users') ? 'active' : null}>Users</Link></div>
        </div>
    )
}