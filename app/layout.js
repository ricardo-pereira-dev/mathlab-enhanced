import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Math Lab Enhanced - Plataforma Inteligente de Matemática',
  description: 'Aprende matemática com IA avançada. Chat interativo, upload de PDFs e materiais personalizados para 7º, 8º e 9º anos.',
  keywords: 'matemática, IA, educação, 7º ano, 8º ano, 9º ano, chat, PDF, exercícios',
  authors: [{ name: 'Math Lab Enhanced Team' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#4f46e5" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  )
}
