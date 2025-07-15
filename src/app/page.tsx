"use client";
import React, { useState } from "react";
import Logo from "./components/Logo";
import AuthForm from "./components/AuthForm";
import FundoForm from "./components/FundoForm";

export default function Home() {
  const [autenticado, setAutenticado] = useState(false);

  return (
    <>
      <Logo />
      {!autenticado ? (
        <AuthForm onLoginSuccess={() => setAutenticado(true)} />
      ) : (
        <FundoForm />
      )}
    </>
  );
}
