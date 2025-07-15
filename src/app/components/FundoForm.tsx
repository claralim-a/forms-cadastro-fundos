"use client";
import React, { useState } from "react";
import { cnpj } from "cpf-cnpj-validator";

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

const opcoesClasse = [
  "Renda Fixa",
  "Multimercado",
  "Ações",
  "Cambial",
  "ETF",
  "FII",
  "Previdência",
];

export default function FundoForm() {
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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Função de cadastro do fundo
  async function cadastrarFundo(data: FormularioFundo) {
    try {
      const response = await fetch("http://localhost:8000/fundos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        return { sucesso: true };
      } else {
        const erroTexto = await response.text();
        console.error("Erro ao cadastrar fundo:", erroTexto);
        return { sucesso: false, erro: erroTexto };
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      return { sucesso: false, erro: "Erro na conexão com o servidor." };
    }
  }


  // handleSubmit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verificação Formato CNPJ
    if (!cnpj.isValid(form.ST_CNPJ_FUNDO)) {
      alert("CNPJ inválido! O formato correto é: XX.XXX.XXX/XXXX-XX.");
      return;
    }

    if (form.ST_CNPJ_FUNDOMASTER && !cnpj.isValid(form.ST_CNPJ_FUNDOMASTER)) {
      alert("CNPJ Fundo Master inválido! O formato correto é: XX.XXX.XXX/XXXX-XX.");
      return;
    }

    const resultado = await cadastrarFundo(form);

    if (resultado.sucesso) {
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
        if (resultado.erro) {
            try {
            const erroJson = JSON.parse(resultado.erro);
            if (erroJson.ID_FUNDO?.length || erroJson.ST_CNPJ_FUNDO?.length) {
                alert("Já existe um fundo com este ID ou CNPJ.");
            } else {
                alert("Erro ao cadastrar fundo: " + resultado.erro);
            }
            } catch {
            alert("Erro ao cadastrar fundo.");
            }
        }
    }
};

  return (
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cadastro de Fundos</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
        // ID_FUNDO
          name="ID_FUNDO"
          type="text"
          placeholder="ID do Fundo"
          className="w-full border p-2"
          value={form.ID_FUNDO}
          onChange={handleChange}
          required
        />
        <input
        // CNPJ FUNDO
          name="ST_CNPJ_FUNDO"
          type="text"
          placeholder="CNPJ do fundo"
          className="w-full border p-2"
          value={form.ST_CNPJ_FUNDO}
          onChange={handleChange}
          required
        />
        <select
        // CLASSE FUNDO
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
        <textarea
        // ESTRATEGIA
          name="ST_ESTRATEGIA_FUNDO"
          placeholder="Descrição da estratégia"
          className="w-full border p-2"
          value={form.ST_ESTRATEGIA_FUNDO}
          onChange={handleChange}
          required
        />
        <textarea
        // OBSERVACAO
          name="ST_OBS_FUNDO"
          placeholder="Observações gerais (Opcional)"
          className="w-full border p-2"
          value={form.ST_OBS_FUNDO}
          onChange={handleChange}
        />
        <textarea
        // RELATORIO 1
          name="ST_RELATORIO1_FUNDO"
          placeholder="Relatório 1"
          className="w-full border p-2"
          value={form.ST_RELATORIO1_FUNDO}
          onChange={handleChange}
          required
        />
        <textarea
        // RELATORIO 2
          name="ST_RELATORIO2_FUNDO"
          placeholder="Relatório 2 (Opcional)"
          className="w-full border p-2"
          value={form.ST_RELATORIO2_FUNDO}
          onChange={handleChange}
        />
        <textarea
        // RELATORIO 3
          name="ST_RELATORIO3_FUNDO"
          placeholder="Relatório 3 (Opcional)"
          className="w-full border p-2"
          value={form.ST_RELATORIO3_FUNDO}
          onChange={handleChange}
        />
        <input
        // CODIGO FUNDOMASTER
          name="COD_QUANTUM_FUNDOMASTER"
          type="text"
          placeholder="Código fundo master (Opcional)"
          className="w-full border p-2"
          value={form.COD_QUANTUM_FUNDOMASTER}
          onChange={handleChange}
        />
        <input
        // CNPJ FUNDOMASTER
          name="ST_CNPJ_FUNDOMASTER"
          type="text"
          placeholder="CNPJ fundo master (Opcional)"
          className="w-full border p-2"
          value={form.ST_CNPJ_FUNDOMASTER}
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
  );
}
