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
import Sidebar from "./components/Sidebar/Sidebar";
import { useParams } from "next/navigation";
import LanguageServices from "@/app/LanguageServices";


export default function Home() {
  const dispatch = useDispatch();
  const allData = useSelector((state) => state.languages.value);


  // This is the home page
  const message = useSelector((state) => state.languages.spinnerMessage);
  let active = message !== "";

  const fetchData = async () => {
    dispatch(setSpinnerMessage("Loading Language"));
    try {
      const data = await LanguageServices.getAllLanguages();
      dispatch(setSpinnerMessage(""));
      let formattedData = data.map(obj => ({ _id: obj._id, name: obj.name }));
      dispatch(setlanguagesList(formattedData));
      dispatch(setValue(data))
      return data;
    } catch (error) {
      dispatch(setErrorMessage({ message: `${error}`, sign: "negative" }));
      throw error;
    }
  }
  useEffect(() => {
    fetchData();
  }, [dispatch]);


  return (
    <div>
      {active ? <Spinner /> : (
        <div style={{display: 'flex', flexDirection:"row", height:"100vh", width:"100vw"}}>
          <Sidebar/>
          <LanguagesBox/>
        </div>

      )}
    </div>
  );
}
