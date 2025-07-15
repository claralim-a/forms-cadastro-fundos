"use client";
import React, { useState } from "react";

type AuthFormProps = {
  onLoginSuccess: () => void;
};

export default function AuthForm({ onLoginSuccess }: AuthFormProps) {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [login, setLogin] = useState({ usuario: "", senha: "" });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const usuarioCorreto = process.env.NEXT_PUBLIC_LOGIN_USER;
    const senhaCorreta = process.env.NEXT_PUBLIC_LOGIN_PASSWORD;

    if (login.usuario === usuarioCorreto && login.senha === senhaCorreta) {
      onLoginSuccess();
    } else {
      alert("Usuário ou senha incorretos!");
    }
  };

  return (
    <main className="max-w-sm mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Autenticação</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="text"
          name="superuser"
          placeholder="Usuário"
          value={login.usuario}
          onChange={(e) =>
            setLogin((prev) => ({ ...prev, usuario: e.target.value }))
          }
          className="w-full border p-2"
          required
        />
        <div className="relative">
          <input
            type={mostrarSenha ? "text" : "password"}
            name="senha"
            placeholder="Senha"
            value={login.senha}
            onChange={(e) =>
              setLogin((prev) => ({ ...prev, senha: e.target.value }))
            }
            className="w-full border p-2 pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setMostrarSenha((prev) => !prev)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-blue-600"
          >
            {mostrarSenha ? "Ocultar" : "Mostrar"}
          </button>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Entrar
        </button>
      </form>
    </main>
  );
}
