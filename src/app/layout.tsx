import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"
import React from "react";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Mustafa Karakaş',
    description: 'LinkedIn&GitHub @mustafakarakas61',
}

export default function RootLayout({children,}: { children: React.ReactNode }) {
    return (
        <html lang="tr">
        <body className={inter.className}>
        <div className="bg-primary flex flex-col items-center justify-start drawer-content">
            <Header/>
            <main>{children}</main>
            <Footer/>
        </div>
        </body>
        </html>
    )
}
