import './globals.css'
import { Inter } from 'next/font/google';
import Background from './components/Background';
import AppProvider from './redux/AppProvider';
import InputError from './components/PopUps/InputError';
import Spinner from './components/Spinner/Spinner';
import Head from 'next/head';


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CS Notes',
  description: 'A notebook for storing all my tech related course notes and explorations',
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
<link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet"></link>
      </head>
      
      <body className={inter.className}>
        <Background>
          <AppProvider>
            {children}
            <InputError /> 
          </AppProvider>
        </Background>
        <div className="overlay"></div>
      </body>
    </html>
  )
}