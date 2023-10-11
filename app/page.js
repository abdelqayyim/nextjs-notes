'use client'
import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link';
import LanguagesBox from './components/LanguagesBox/LanguagesBox';
import { useSelector } from 'react-redux';
import { LOADING_STATE } from './redux/slice';
import Message from './components/message-popup/Message';

export default function Home() {
  const currentLoadingState = useSelector((state) => state.languages.loading);
 

  return (
    
    <div>
      {currentLoadingState == LOADING_STATE.LOADING && <Message message={"Loading languages"}/>}
      <LanguagesBox/>
    </div>
  )
}
