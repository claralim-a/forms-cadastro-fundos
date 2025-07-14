"use client";
import React, { useState } from "react";
import Image from "next/image";
import { cnpj } from "cpf-cnpj-validator";

// Definição de constantes e suas formas
export default function Home() {
  const [form, setForm] = useState<{
    cnpj: string;
    classe: string;
    estrategia: string;
    observacoes: string;
    relatorios: string[];
    codFundoMaster: string;
    cnpjFundoMaster: string;
  }>({
    cnpj: "",
    classe: "",
    estrategia: "",
    observacoes: "",
    relatorios: [],
    codFundoMaster: "",
    cnpjFundoMaster: ""
  });

  const opcoesClasse = [
    "Renda Fixa",
    "Multimercado",
    "Ações",
    "Cambial",
    "ETF",
    "FII",
    "Previdência"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleRelatorioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setForm(prev => ({
      ...prev,
      relatorios: checked
        ? [...prev.relatorios, value]
        : prev.relatorios.filter(item => item !== value)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    // validação cnpj
  if (!cnpj.isValid(form.cnpj)) {
    alert("CNPJ inválido!");
    return;
  }
  // validação campos obrigatórios
  if (!form.classe || !form.estrategia) {
  alert("Preencha todos os campos obrigatórios.");
  return;
  }
    console.log("Dados enviados:", form);
    // Aqui depois vamos integrar com a API 
  };
      
  return (
  <>
    {/* Logo no topo direito */}
    <div className="w-full flex justify-end p-4">
      <Image
        src="/logo-outliers.png"
        alt="Logo Outliers Advisory"
        width={160}
        height={40}
        priority
      />
      </div>

      <main className="max-w-xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Cadastro de Fundos</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="cnpj" type="text" placeholder="CNPJ do fundo" className="w-full border p-2" onChange={handleChange} required />

      <select name="classe" className="w-full border p-2" onChange={handleChange} required>
        <option value="">Selecione a Classe ANBIMA</option>
        {opcoesClasse.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

          <textarea name="estrategia" placeholder="Descrição da estratégia" className="w-full border p-2" onChange={handleChange} required />
          <textarea name="observacoes" placeholder="Observações gerais" className="w-full border p-2" onChange={handleChange} />

          <fieldset>
            <legend>Relatórios</legend>
            {["1", "2", "3"].map((r) => (
              <label key={r} className="block">
                <input type="checkbox" value={r} onChange={handleRelatorioChange} /> {r}
              </label>
            ))}
          </fieldset>

          <input name="codFundoMaster" type="text" placeholder="Código fundo master (opcional)" className="w-full border p-2" onChange={handleChange} />
          <input name="cnpjFundoMaster" type="text" placeholder="CNPJ fundo master (opcional)" className="w-full border p-2" onChange={handleChange} />

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Enviar</button>
        </form>
      </main>
    </>
  );
}
