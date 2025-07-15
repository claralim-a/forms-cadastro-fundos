"use client";
import React, { useState } from "react";
import Image from "next/image";
import { cnpj } from "cpf-cnpj-validator";

// Tipagem do formulário
type FormularioFundo = {
  cnpj: string;
  classe: string;
  estrategia: string;
  observacoes: string;
  relatorio1: string;
  relatorio2: string;
  relatorio3: string;
  codFundoMaster: string;
  cnpjFundoMaster: string;
};

export default function Home() {
  const [autenticado, setAutenticado] = useState(false);

  // Estado de login inicializado com strings vazias
  const [mostrarSenha, setMostrarSenha] = useState(false);  
  const [login, setLogin] = useState<{ usuario: string; senha: string }>({
    usuario: "",
    senha: "",
  });

  const [form, setForm] = useState<FormularioFundo>({
    cnpj: "",
    classe: "",
    estrategia: "",
    observacoes: "",
    relatorio1: "",
    relatorio2: "",
    relatorio3: "",
    codFundoMaster: "",
    cnpjFundoMaster: "",
  });

  const opcoesClasse = [
    "Renda Fixa",
    "Multimercado",
    "Ações",
    "Cambial",
    "ETF",
    "FII",
    "Previdência",
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const usuarioCorreto = process.env.NEXT_PUBLIC_LOGIN_USER;
    const senhaCorreta = process.env.NEXT_PUBLIC_LOGIN_PASSWORD;

    if (login.usuario === usuarioCorreto && login.senha === senhaCorreta) {
      setAutenticado(true);
    } else {
      alert("Usuário ou senha incorretos!");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!cnpj.isValid(form.cnpj)) {
      alert("CNPJ inválido! O formato correto é: XX.XXX.XXX/XXXX-XX.");
      return;
    }

    if (!form.classe || !form.estrategia) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    console.log("Dados enviados:", form);
    // Aqui pode integrar com API futuramente
  };

  return (
    <>
      {/* Logo*/}
      <div className="w-full flex justify-end p-4">
        <Image
          src="/logo-outliers.png"
          alt="Logo Outliers Advisory"
          width={160}
          height={40}
          priority
        />
      </div>

      {!autenticado ? (
        <main className="max-w-sm mx-auto p-4">
          <h2 className="text-xl font-bold mb-4">Autenticação</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              name="usuario"
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
      ) : (
        // Titulo
        <main className="max-w-xl mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Cadastro de Fundos</h1>
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* CNPJ */}
            <input
              name="cnpj"
              type="text"
              placeholder="CNPJ do fundo"
              className="w-full border p-2"
              value={form.cnpj}
              onChange={handleChange}
              required
            />

            {/* Classe ANBIMA */}
            <select
              name="classe"
              className={`w-full border p-2 ${
                form.classe === "" ? "text-gray-250" : "text-black"
              }`}
              value={form.classe}
              onChange={handleChange}
              required
            >
              <option value="">Selecione a Classe ANBIMA</option>
              {opcoesClasse.map((item) => (
                <option key={item} value={item} className="text-black">
                  {item}
                </option>
              ))}
            </select>

            {/* Estrategia */}
            <textarea
              name="estrategia"
              placeholder="Descrição da estratégia"
              className="w-full border p-2"
              value={form.estrategia}
              onChange={handleChange}
              required
            />

            {/* Observacoes */}
            <textarea
              name="observacoes"
              placeholder="Observações gerais"
              className="w-full border p-2"
              value={form.observacoes}
              onChange={handleChange}
            />

            {/* Relatorios */}
            <textarea
              name="relatorio1"
              placeholder="Relatório 1 (Opcional)"
              className="w-full border p-2"
              value={form.relatorio1}
              onChange={handleChange}
            />
            <textarea
              name="relatorio2"
              placeholder="Relatório 2 (Opcional)"
              className="w-full border p-2"
              value={form.relatorio2}
              onChange={handleChange}
            />

            <textarea
              name="relatorio3"
              placeholder="Relatório 3 (Opcional)"
              className="w-full border p-2"
              value={form.relatorio3}
              onChange={handleChange}
            />

            {/* Codigo Fundo Master */}
            <input
              name="codFundoMaster"
              type="text"
              placeholder="Código fundo master (Opcional)"
              className="w-full border p-2"
              value={form.codFundoMaster}
              onChange={handleChange}
            />

            {/* CNPJ Fundo Master */}
            <input
              name="cnpjFundoMaster"
              type="text"
              placeholder="CNPJ fundo master (Opcional)"
              className="w-full border p-2"
              value={form.cnpjFundoMaster}
              onChange={handleChange}
            />

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Enviar
            </button>
          </form>
        </main>
      )}
    </>
  );
}
