"use client";
import React, { useState } from "react";
import "./globals.css";
import Background from "./Background";
import LanguagesBox from "../components/LanguagesBox/LanguagesBox";
import NoteDisplay from "../components/note-display/NoteDisplay";
import Prism from "prismjs";
import { useRouter } from "next/navigation";
import AppContext from "./AppContext";
import ToggleMode from "../components/ToggleMode/ToggleMode";
import RootLayout from "./layout";

import { useSelector, useDispatch } from 'react-redux';
import { deleteOne } from "../../src/app/Redux/slice";
import Link from "next/link";


function App() {


  return (
    <RootLayout>
      <div>Hello</div>
    
    </RootLayout>
  );
}

// TASK: page transitions maybe/
export default App;


