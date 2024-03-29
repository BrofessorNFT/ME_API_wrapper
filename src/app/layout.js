import { Inter } from 'next/font/google'
import './globals.css'
import NavContainer from '@/components/navcontainer';
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from '@vercel/analytics/react';
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavContainer/>
          {children}
        </ThemeProvider>
          <Analytics />
        
        </body>
    </html>
  )
}
