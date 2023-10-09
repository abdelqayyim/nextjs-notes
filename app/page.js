'use client'
import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link';
import LanguagesBox from './components/LanguagesBox/LanguagesBox';
import { useSelector, useDispatch } from 'react-redux';

export default function Home() {
  const URL = "https://fair-teal-gharial-coat.cyclic.app/languages/";


  
  return (
    
    <div>
      <LanguagesBox/>
    </div>
  )
}
