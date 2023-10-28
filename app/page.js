"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import LanguagesBox from "./components/LanguagesBox/LanguagesBox";
import { useSelector } from "react-redux";
import { LOADING_STATE } from "./redux/slice";
import Spinner from "./components/Spinner/Spinner";

export default function Home() {
  const currentLoadingState = useSelector((state) => state.languages.loading);

  return (
    <div>
      {currentLoadingState == LOADING_STATE.LOADING && (
        <Spinner message={"Loading languages"} />
      )}
      <LanguagesBox />
    </div>
  );
}
