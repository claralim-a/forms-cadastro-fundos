"use client";
import React, { useState } from "react";
import Image from "next/image";
import { cnpj } from "cpf-cnpj-validator";

// CONFIGURAÇÕES PROJETO ===========================================================

// Tipagem do formulário
type FormularioFundo = {
  ID_FUNDO: string;
  ST_CNPJ_FUNDO: string;
  ST_CLASSE_FUNDO: string;
  ST_ESTRATEGIA_FUNDO: string;
  ST_OBS_FUNDO: string;
  ST_RELATORIO1_FUNDO: string;
  ST_RELATORIO2_FUNDO: string;
  ST_RELATORIO3_FUNDO: string;
  COD_QUANTUM_FUNDOMASTER: string;
  ST_CNPJ_FUNDOMASTER: string;
};

// Autenticação
export default function Home() {
  const [autenticado, setAutenticado] = useState(false);

  // Estado de login inicializado com strings vazias
  const [mostrarSenha, setMostrarSenha] = useState(false);  
  const [login, setLogin] = useState<{ usuario: string; senha: string }>({
    usuario: "",
    senha: "",
  });

  const [form, setForm] = useState<FormularioFundo>({
    ID_FUNDO: "",
    ST_CNPJ_FUNDO: "",
    ST_CLASSE_FUNDO: "",
    ST_ESTRATEGIA_FUNDO: "",
    ST_OBS_FUNDO: "",
    ST_RELATORIO1_FUNDO: "",
    ST_RELATORIO2_FUNDO: "",
    ST_RELATORIO3_FUNDO: "",
    COD_QUANTUM_FUNDOMASTER: "",
    ST_CNPJ_FUNDOMASTER: "",
  });

  // Opções classe ANBIMA
  const opcoesClasse = [
    "Renda Fixa",
    "Multimercado",
    "Ações",
    "Cambial",
    "ETF",
    "FII",
    "Previdência",
  ];

  // Login 
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

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // CNPJ fundo
  if (!cnpj.isValid(form.ST_CNPJ_FUNDO)) {
    alert("CNPJ inválido! O formato correto é: XX.XXX.XXX/XXXX-XX.");
    return;
  }

  // CNPJ fundo master (opcional)
  if (form.ST_CNPJ_FUNDOMASTER && !cnpj.isValid(form.ST_CNPJ_FUNDOMASTER)) {
    alert("CNPJ Fundo Master inválido! O formato correto é: XX.XXX.XXX/XXXX-XX.");
    return;
  }

  if (!form.ST_CLASSE_FUNDO || !form.ST_ESTRATEGIA_FUNDO || !form.ST_RELATORIO1_FUNDO) {
    alert("Preencha todos os campos obrigatórios.");
    return;
  }

  try {
    const response = await fetch("http://localhost:8000/fundos/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${process.env.NEXT_PUBLIC_API_TOKEN}`,  
      },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      alert("Fundo cadastrado com sucesso!");
      setForm({
        ID_FUNDO: "",
        ST_CNPJ_FUNDO: "",
        ST_CLASSE_FUNDO: "",
        ST_ESTRATEGIA_FUNDO: "",
        ST_OBS_FUNDO: "",
        ST_RELATORIO1_FUNDO: "",
        ST_RELATORIO2_FUNDO: "",
        ST_RELATORIO3_FUNDO: "",
        COD_QUANTUM_FUNDOMASTER: "",
        ST_CNPJ_FUNDOMASTER: "",
      });
      } else {
        const erroTexto = await response.text();
        console.error("Erro ao cadastrar fundo:", erroTexto);
        alert("Erro ao cadastrar fundo. Verifique os dados ou o servidor.");
      }
  } catch (error) {
    console.error("Erro na requisição:", error);
    alert("Erro na conexão com o servidor.");
  }
};

  // INTERFACE ===============================================================
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

      {/* Página de Autenticação */}
      {!autenticado ? (
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
      ) : (
        // Titulo
        <main className="max-w-xl mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Cadastro de Fundos</h1>
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* ID_FUNDO */}
            <input
              name="ID_FUNDO"
              type="text"
              placeholder="ID do Fundo"
              className="w-full border p-2"
              value={form.ID_FUNDO}
              onChange={handleChange}
              required
            />

            {/* CNPJ */}
            <input
              name="ST_CNPJ_FUNDO"
              type="text"
              placeholder="CNPJ do fundo"
              className="w-full border p-2"
              value={form.ST_CNPJ_FUNDO}
              onChange={handleChange}
              required
            />

            {/* CLASSE ANBIMA */}
            <select
              name="ST_CLASSE_FUNDO"
              className={`w-full border p-2 bg-black text-white ${
                form.ST_CLASSE_FUNDO === "" ? "text-gray-400" : "text-white"
              }`}
              value={form.ST_CLASSE_FUNDO}
              onChange={handleChange}
              required
            >
              <option value="" className="text-gray-400">
                Selecione a Classe ANBIMA
              </option>
              {opcoesClasse.map((item) => (
                <option key={item} value={item} className="text-white bg-black">
                  {item}
                </option>
              ))}
            </select>

            {/* Estrategia */}
            <textarea
              name="ST_ESTRATEGIA_FUNDO"
              placeholder="Descrição da estratégia"
              className="w-full border p-2"
              value={form.ST_ESTRATEGIA_FUNDO}
              onChange={handleChange}
              required
            />

            {/* Observacoes */}
            <textarea
              name="ST_OBS_FUNDO"
              placeholder="Observações gerais (Opcional)"
              className="w-full border p-2"
              value={form.ST_OBS_FUNDO}
              onChange={handleChange}
            />

            {/* Relatorios */}
            <textarea
              name="ST_RELATORIO1_FUNDO"
              placeholder="Relatório 1"
              className="w-full border p-2"
              value={form.ST_RELATORIO1_FUNDO}
              onChange={handleChange}
              required // único required entre os relatorios
            />
            <textarea
              name="ST_RELATORIO2_FUNDO"
              placeholder="Relatório 2 (Opcional)"
              className="w-full border p-2"
              value={form.ST_RELATORIO2_FUNDO}
              onChange={handleChange}
            />

            <textarea
              name="ST_RELATORIO3_FUNDO"
              placeholder="Relatório 3 (Opcional)"
              className="w-full border p-2"
              value={form.ST_RELATORIO3_FUNDO}
              onChange={handleChange}
            />

            {/* Codigo Fundo Master */}
            <input
              name="COD_QUANTUM_FUNDOMASTER"
              type="text"
              placeholder="Código fundo master (Opcional)"
              className="w-full border p-2"
              value={form.COD_QUANTUM_FUNDOMASTER}
              onChange={handleChange}
            />

            {/* CNPJ Fundo Master */}
            <input
              name="ST_CNPJ_FUNDOMASTER"
              type="text"
              placeholder="CNPJ fundo master (Opcional)"
              className="w-full border p-2"
              value={form.ST_CNPJ_FUNDOMASTER}
              onChange={handleChange}
            />

            {/* Botão Submit */}
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
