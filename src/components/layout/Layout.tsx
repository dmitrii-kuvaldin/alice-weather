import React from "react";
import styles from "./layout.module.css";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import Form from "../form/Form";

export default function Layout() {
  return (
    <>
      <Header />
      <Form />
    </>
  );
}
