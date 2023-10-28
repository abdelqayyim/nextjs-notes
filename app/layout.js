import './globals.css'
import { Inter } from 'next/font/google';
import Background from './components/Background';
import AppProvider from './redux/AppProvider';
import InputError from './components/PopUps/InputError';


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CS Notes',
  description: 'A notebook for storing all my tech related course notes and explorations',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      <body className={inter.className}>
        <Background>
          <AppProvider>
            {/* this is for the error that shows up from the bottom */}
            {children}
            <InputError> 
            </InputError>
          </AppProvider>
        </Background>
        <div className="overlay"></div>
      </body>
    </html>
  )
}