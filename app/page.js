"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import LanguagesBox from "./components/LanguagesBox/LanguagesBox";
import { useSelector, useDispatch } from "react-redux";
import { LOADING_STATE } from "./redux/slice";
import Spinner from "./components/Spinner/Spinner";
import { setValue, setSpinnerMessage,setErrorMessage, setlanguagesList } from "./redux/slice";

export default function Home() {
  const message = useSelector((state) => state.languages.spinnerMessage);
  let active = message !== "";

  return (
    <div>
      {active ? <Spinner /> : <LanguagesBox/>}
      
    </div>
  );
}
