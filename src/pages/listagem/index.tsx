import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from "@firebase/firebaseConfig";
import { useRouter } from 'next/router';

export default function Home() {
  const [name, setName] = useState('');

  const router = useRouter();

  // Função para adicionar dados ao Firestore
  const addFormResponse = async (data: { name: string; userId: string }) => {
    try {
      const docRef = await addDoc(collection(db, "patients"), data); // Coleção "patients"
      console.log("Documento adicionado com ID do Firebase:", docRef.id);
      return docRef.id;
    } catch (error) {
      console.error("Erro ao adicionar documento:", error);
      throw error;
    }
  };

  // Função para gerar ID e enviar dados
  const handleSubmit = async () => {
    if (!name.trim()) {
      alert("Por favor, insira o nome do paciente.");
      return;
    }
    
    const userId = crypto.randomUUID(); // Gera um UUID automaticamente
    await addFormResponse({ name, userId });
    setName(""); // Limpa o campo após o envio
    router.push(`form/${userId}`); // Redireciona para a página de pacientes
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-2xl font-bold text-center mb-4">
        Cadastro de Paciente
      </div>

      {/* Campo para o Nome do Paciente */}
      <input
        type="text"
        placeholder="Nome do Paciente"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-gray-300 rounded-md p-2 mb-4"
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white rounded-md p-2 mt-4 w-32"
      >
        Enviar
      </button>
    </div>
  );
}