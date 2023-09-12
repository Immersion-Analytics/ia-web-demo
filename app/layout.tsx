import './globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import Providers from "@/app/providers";

const font = Montserrat({ weight: ['300', '600'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Immersion Analytics | Demos',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
