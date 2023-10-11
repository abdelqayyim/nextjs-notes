import './globals.css'
import { Inter } from 'next/font/google';
import Background from './components/Background';
import store from './redux/store';
import AppProvider from './redux/AppProvider';


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CS Notes',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Background>
          <AppProvider>
            {children}
          </AppProvider>
        </Background>
        <div className="overlay"></div>
      </body>
    </html>
  )
}
