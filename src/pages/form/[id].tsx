import React, { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@firebase/firebaseConfig";
import { useRouter } from "next/router";

interface FormData {
    inicio?: string;
    amamentando?: string;
    fatores_risco?: string;
    hipertensao?: string;
    hipertensao_controlada?: string;
    pressao_elevada?: string;
    doenca_vascular?: string;
    historico_tvp_ep?: string;
    tvp_ep_atual?: string;
    historia_familiar_tvp_ep?: string;
    cirurgia_grande_porte?: string;
    cirurgia_pequeno_porte?: string;
    mutacoes_trombogenicas?: string;
    doenca_cardiaca_atual?: string;
    doenca_cardiaca_historia?: string;
    derrame?: string;
    hiperlipidermia?: string;
    enxaqueca?: string;
    sangramento_vaginal?: string;
    neoplasia_cervical?: string;
    cancer_cervical?: string;
    doenca_mamaria?: string;
    cancer_mama?: string;
    hiv?: string;
    diabetes?: string;
    doenca_vesicula?: string;
    colestase?: string;
    hepatite?: string;
    cirrose?: string;
    tumores?: string;
    medicamentos?: string;
    antibioticos?: string;
}

export default function Form() {
  const router = useRouter();
  const { id } = router.query; // Get the id parameter from the URL
  const [isLoading, setIsLoading] = useState(true);
  
  const [formData, setFormData] = useState<FormData>({
    inicio: "",
    amamentando: "",
    fatores_risco: "",
    hipertensao: "",
    hipertensao_controlada: "",
    pressao_elevada: "",
    doenca_vascular: "",
    historico_tvp_ep: "",
    tvp_ep_atual: "",
    historia_familiar_tvp_ep: "",
    cirurgia_grande_porte: "",
    cirurgia_pequeno_porte: "",
    mutacoes_trombogenicas: "",
    doenca_cardiaca_atual: "",
    doenca_cardiaca_historia: "",
    derrame: "",
    hiperlipidermia: "",
    enxaqueca: "",
    sangramento_vaginal: "",
    neoplasia_cervical: "",
    cancer_cervical: "",
    doenca_mamaria: "",
    cancer_mama: "",
    hiv: "",
    diabetes: "",
    doenca_vesicula: "",
    colestase: "",
    hepatite: "",
    cirrose: "",
    tumores: "",
    medicamentos: "",
    antibioticos: "",
  });

  // Add an effect to handle the loading state
  useEffect(() => {
    if (!router.isReady) return;
    
    // Once the router is ready and we have the ID, we can proceed
    if (id) {
      setIsLoading(false);
    } else {
      // If no ID is present, redirect back to the listing page
      router.push('/');
    }
  }, [router.isReady, id]);

  const handleSubmit = async () => {
    try {
      const response = await addDoc(collection(db, "responses"), {
        ...formData,
        userId: id as string, // Use the id from router.query
        submittedAt: new Date().toISOString(),
      });
      console.log("Respostas enviadas com ID:", response.id);

      router.push(`/resultado/${id}`);
    } catch (error) {
      console.error("Erro ao enviar respostas:", error);
    }
  };

  // Show loading state
  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Formulário de Implantes</h1>

      <label className="block mb-2">Histórico de Uso do Implanon</label>
      <select
        value={formData.inicio}
        onChange={(e) => setFormData({ ...formData, inicio: e.target.value })}
        className="border p-2 mb-4 w-full"
      >
        <option value="">Selecione</option>
        <option value="Inicio do método">Inicio do método</option>
        <option value="Continuação do método">Continuação do método</option>
      </select>

      {/* Campo Amamentação */}
      <label className="block mb-2">Amamentação</label>
      <select
        value={formData.amamentando}
        onChange={(e) =>
          setFormData({ ...formData, amamentando: e.target.value })
        }
        className="border p-2 mb-4 w-full"
      >
        <option value="">Selecione</option>
        <option value="<6_semanas">Menos de 6 semanas após o parto</option>
        <option value="6_6_meses">De 6 semanas a 6 meses após o parto</option>
        <option value=">6_meses">Mais de 6 meses após o parto</option>
      </select>

      {/* Múltiplos fatores de risco de doença cardiovascular arterial */}
      <label className="block mb-2">
        Múltiplos fatores de risco de doença cardiovascular arterial (idade
        avançada, fumo, diabetes e hipertensão)
      </label>
      <select
        value={formData.fatores_risco}
        onChange={(e) =>
          setFormData({ ...formData, fatores_risco: e.target.value })
        }
        className="border p-2 mb-4 w-full"
      >
        <option value="">Selecione</option>
        <option value="false">Não</option>
        <option value="true">Sim</option>
      </select>

      {/*Histórico de hipertensão em local onde a pressão arterial NÃO POSSA ser avaliada (inclusive hipertensão na gravidez) */}

      <label className="block mb-2">
        Histórico de hipertensão em local onde a pressão arterial NÃO POSSA ser
        avaliada (inclusive hipertensão na gravidez)
      </label>
      <select
        value={formData.hipertensao}
        onChange={(e) =>
          setFormData({ ...formData, hipertensao: e.target.value })
        }
        className="border p-2 mb-4 w-full"
      >
        <option value="">Selecione</option>
        <option value="false">Não</option>
        <option value="true">Sim</option>
      </select>

      {/*Hipertensão adequadamente controlada, em local onde a pressão POSSA ser avaliada */}
      <label className="block mb-2">
        Hipertensão adequadamente controlada, em local onde a pressão POSSA ser
        avaliada
      </label>
      <select
        value={formData.hipertensao_controlada}
        onChange={(e) =>
          setFormData({ ...formData, hipertensao_controlada: e.target.value })
        }
        className="border p-2 mb-4 w-full"
      >
        <option value="">Selecione</option>
        <option value="false">Não</option>
        <option value="true">Sim</option>
      </select>

      {/*Pressão arterial elevada (corretamente medida)*/}
      <label className="block mb-2">
        Pressão arterial elevada (corretamente medida)
      </label>
      <select
        value={formData.pressao_elevada}
        onChange={(e) =>
          setFormData({ ...formData, pressao_elevada: e.target.value })
        }
        className="border p-2 mb-4 w-full"
      >
        <option value="">Selecione</option>
        <option value="140-159">Sistólica 140–159 ou diastólica 90–99 </option>
        <option value=">=160">{`Sistolica >_ 160 ou diastólica  >_ 100g`}</option>
      </select>

      {/*Doença vascular*/}
      <label className="block mb-2">Doença vascular</label>
      <select
        value={formData.doenca_vascular}
        onChange={(e) =>
          setFormData({ ...formData, doenca_vascular: e.target.value })
        }
        className="border p-2 mb-4 w-full"
      >
        <option value="">Selecione</option>
        <option value="false">Não</option>
        <option value="true">Sim</option>
      </select>

      {/*Histórico de TVP/EP*/}
      <label className="block mb-2">
        Histórico de Trombose venosa profunda/ Embolia pulmonar
      </label>
      <select
        value={formData.historico_tvp_ep}
        onChange={(e) =>
          setFormData({ ...formData, historico_tvp_ep: e.target.value })
        }
        className="border p-2 mb-4 w-full"
      >
        <option value="">Selecione</option>
        <option value="false">Não</option>
        <option value="true">Sim</option>
      </select>

      {/*TVP/EP atual*/}
      <label className="block mb-2">
        Trombose venosa profunda/ Embolia pulmonar atual
      </label>
      <select
        value={formData.tvp_ep_atual}
        onChange={(e) =>
          setFormData({ ...formData, tvp_ep_atual: e.target.value })
        }
        className="border p-2 mb-4 w-full"
      >
        <option value="">Selecione</option>
        <option value="false">Não</option>
        <option value="true">Sim</option>
      </select>

      {/*História familiar deTVP/EP (parentes de primeiro grau)*/}
      <label className="block mb-2">
        História familiar de Trombose venosa profunda/ Embolia pulmonar
        (parentes de primeiro grau)
      </label>
      <select
        value={formData.historia_familiar_tvp_ep}
        onChange={(e) =>
          setFormData({ ...formData, historia_familiar_tvp_ep: e.target.value })
        }
        className="border p-2 mb-4 w-full"
      >
        <option value="">Selecione</option>
        <option value="false">Não</option>
        <option value="true">Sim</option>
      </select>

      {/*Cirurgia de grande porte*/}
      <label className="block mb-2">Cirurgia de grande porte</label>
      <select
        value={formData.cirurgia_grande_porte}
        onChange={(e) =>
          setFormData({ ...formData, cirurgia_grande_porte: e.target.value })
        }
        className="border p-2 mb-4 w-full"
      >
        <option value="">Selecione</option>
        <option value="false">Não</option>
        <option value="true">Sim</option>
        <option value="Com imobilização prolongada">
          Com imobilização prolongada
        </option>
        <option value="Sem imobilização prolongada">
          Sem imobilização prolongada
        </option>
      </select>

      {/*Cirurgia de pequeno porte sem imobilização prolongada*/}
      <label className="block mb-2">
        Cirurgia de pequeno porte sem imobilização prolongada
      </label>
      <select
        value={formData.cirurgia_pequeno_porte}
        onChange={(e) =>
          setFormData({ ...formData, cirurgia_pequeno_porte: e.target.value })
        }
        className="border p-2 mb-4 w-full"
      >
        <option value="">Selecione</option>
        <option value="false">Não</option>
        <option value="true">Sim</option>
      </select>

      {/*
            Mutações trombogênicas conhecidas (p.ex.,
            Fator V Leiden, Mutação de
            Protrombina; Proteína S,
            Proteína C e Defi ciências
            de antitrombina)g
            */}
      <label className="block mb-2">
        Mutações trombogênicas conhecidas (p.ex., Fator V Leiden, Mutação de
        Protrombina; Proteína S, Proteína C e Deficiências de antitrombina)
      </label>
      <select
        value={formData.mutacoes_trombogenicas}
        onChange={(e) =>
          setFormData({ ...formData, mutacoes_trombogenicas: e.target.value })
        }
        className="border p-2 mb-4 w-full"
      >
        <option value="">Selecione</option>
        <option value="false">Não</option>
        <option value="true">Sim</option>
      </select>

      {/*Doença cardíaca isquêmica*/}
      <label className="block mb-2">Doença cardíaca isquêmica atual</label>
      <select
        value={formData.doenca_cardiaca_atual}
        onChange={(e) =>
          setFormData({ ...formData, doenca_cardiaca_atual: e.target.value })
        }
        className="border p-2 mb-4 w-full"
      >
        <option value="">Selecione</option>
        <option value="false">Não</option>
        <option value="true">Sim</option>
      </select>

      <label className="block mb-2">
        História de Doença cardíaca isquêmica
      </label>
      <select
        value={formData.doenca_cardiaca_historia}
        onChange={(e) =>
          setFormData({ ...formData, doenca_cardiaca_historia: e.target.value })
        }
        className="border p-2 mb-4 w-full"
      >
        <option value="">Selecione</option>
        <option value="false">Não</option>
        <option value="true">Sim</option>
      </select>

      {/*Derrame (históia de acidente vascular cerebral)*/}
      <label className="block mb-2">
        Derrame (história de acidente vascular cerebral)
      </label>
      <select
        value={formData.derrame}
        onChange={(e) => setFormData({ ...formData, derrame: e.target.value })}
        className="border p-2 mb-4 w-full"
      >
        <option value="">Selecione</option>
        <option value="false">Não</option>
        <option value="true">Sim</option>
      </select>

      {/*Hiperlipidermias conhecidas*/}
      <label className="block mb-2">Hiperlipidermias conhecidas</label>
      <select
        value={formData.hiperlipidermia}
        onChange={(e) =>
          setFormData({ ...formData, hiperlipidermia: e.target.value })
        }
        className="border p-2 mb-4 w-full"
      >
        <option value="">Selecione</option>
        <option value="false">Não</option>
        <option value="true">Sim</option>
      </select>

      {/*Dores de cabeça Enxaquecosa*/}
      <label className="block mb-2">Enxaqueca</label>
      <select
        value={formData.enxaqueca}
        onChange={(e) =>
          setFormData({ ...formData, enxaqueca: e.target.value })
        }
        className="border p-2 mb-4 w-full"
      >
        <option value="">Selecione</option>
        <option value="false">Não</option>
        <option value="Sim, sem aura">Sim, sem aura</option>
        <option value="Sim, com aura">Sim, com aura</option>
      </select>

      <label className="block mb-2">Padrões de sangramento vaginal</label>
      <select
        value={formData.sangramento_vaginal}
        onChange={(e) =>
          setFormData({ ...formData, sangramento_vaginal: e.target.value })
        }
        className="border p-2 mb-4 w-full"
      >
        <option value="">Selecione</option>
        <option value="false">Não</option>
        <option value="Padrão irregular sem sangramento intenso">
          Padrão irregular sem sangramento intenso
        </option>
        <option
          value="Sangramento intenso ou prolongado (inclusive padrões regulares e irregulares)"
        >
          Sangramento intenso ou prolongado (inclusive padrões regulares e
          irregulares)
        </option>
        <option
          value="Sangramento vaginal inexplicável (suspeita de problema grave) antes da avaliação"
        >
          Sangramento vaginal inexplicável (suspeita de problema grave) antes da
          avaliação
        </option>
      </select>

      <label className="block mb-2">
        Neoplasia intraepitelial cervical (NIC)
      </label>
      <select
        value={formData.neoplasia_cervical}
        onChange={(e) =>
          setFormData({ ...formData, neoplasia_cervical: e.target.value })
        }
        className="border p-2 mb-4 w-full"
      >
        <option value="">Selecione</option>
        <option value="false">Não</option>
        <option value="true">Sim</option>
      </select>

      <label className="block mb-2">
        Câncer cervical (aguardando tratamento)
      </label>
      <select
        value={formData.cancer_cervical}
        onChange={(e) =>
          setFormData({ ...formData, cancer_cervical: e.target.value })
        }
        className="border p-2 mb-4 w-full"
      >
        <option value="">Selecione</option>
        <option value="false">Não</option>
        <option value="true">Sim</option>
      </select>

      <label className="block mb-2">Doença mamária</label>
      <select
        value={formData.doenca_mamaria}
        onChange={(e) =>
          setFormData({ ...formData, doenca_mamaria: e.target.value })
        }
        className="border p-2 mb-4 w-full"
      >
        <option value="">Selecione</option>
        <option value="false">Não</option>
        <option value="Massa não diagnosticada">Massa não diagnosticada</option>
        <option value="Doença mamária benigna">Doença mamária benigna</option>
        <option value="Histórico de câncer na família">
          Histórico de câncer na família
        </option>
      </select>

      <label className="block mb-2">Câncer de mama</label>
      <select
        value={formData.cancer_mama}
        onChange={(e) =>
          setFormData({ ...formData, cancer_mama: e.target.value })
        }
        className="border p-2 mb-4 w-full"
      >
        <option value="">Selecione</option>
        <option value="false">Não</option>
        <option value="História de câncer de mama por pelo menos 5 anos">
        História de câncer de mama por pelo menos 5 anos
        </option>
        <option value="Câncer de mama atual">Câncer de mama atual</option>
      </select>

      <label className="block mb-2">HIV/Aids</label>
      <select
        value={formData.hiv}
        onChange={(e) => setFormData({ ...formData, hiv: e.target.value })}
        className="border p-2 mb-4 w-full"
      >
        <option value="">Selecione</option>
        <option value="false">Não tem</option>
        <option value="Alto risco de HIV">Alto risco de HIV</option>
        <option value="Infectada com o HIV">Infectada com o HIV</option>
        <option value="Com Aids">Com Aids</option>
        <option value="Em terapia anti-retroviral">
          Em terapia anti-retroviral
        </option>
      </select>

      <label className="block mb-2">Diabetes</label>
      <select
        value={formData.diabetes}
        onChange={(e) => setFormData({ ...formData, diabetes: e.target.value })}
        className="border p-2 mb-4 w-full"
      >
        <option value="">Selecione</option>
        <option value="false">Não</option>
        <option value="Sim">Sim</option>
        <option value="História de diabetes gestacional">
          História de diabetes gestacional
        </option>
      </select>

      <label className="block mb-2">Doença da vesícula biliar</label>
      <select
        value={formData.doenca_vesicula}
        onChange={(e) =>
          setFormData({ ...formData, doenca_vesicula: e.target.value })
        }
        className="border p-2 mb-4 w-full"
      >
        <option value="">Selecione</option>
        <option value="false">Não</option>
        <option value="Sim">Sim</option>
      </select>

      <label className="block mb-2">História de Colestase</label>
      <select
        value={formData.colestase}
        onChange={(e) =>
          setFormData({ ...formData, colestase: e.target.value })
        }
        className="border p-2 mb-4 w-full"
      >
        <option value="">Selecione</option>
        <option value="Relacionada à gravidez">Relacionada à gravidez</option>
        <option value="Relacionada a uso anterior de anticoncepcionais orais combinados">
          Relacionada a uso anterior de anticoncepcionais orais combinados
        </option>
      </select>

      <label className="block mb-2">Hepatite viral</label>
      <select
        value={formData.hepatite}
        onChange={(e) => setFormData({ ...formData, hepatite: e.target.value })}
        className="border p-2 mb-4 w-full"
      >
        <option value="">Selecione</option>
        <option value="false">Não</option>
        <option value="Ativa">Ativa</option>
        <option value="Portador">Portador</option>
      </select>

      <label className="block mb-2">Cirrose hepática</label>
      <select
        value={formData.cirrose}
        onChange={(e) => setFormData({ ...formData, cirrose: e.target.value })}
        className="border p-2 mb-4 w-full"
      >
        <option value="">Selecione</option>
        <option value="false">Não</option>
        <option value="Compensada">Moderada (Compensada)</option>
        <option value="Descompensada">Aguda (Descompensada)</option>
      </select>

      <label className="block mb-2">Tumores hepáticos</label>
      <select
        value={formData.tumores}
        onChange={(e) => setFormData({ ...formData, tumores: e.target.value })}
        className="border p-2 mb-4 w-full"
      >
        <option value="">Selecione</option>
        <option value="false">Não</option>
        <option value="Benigno">Benigno</option>
        <option value="Maligno">Maligno</option>
      </select>

      <label className="block mb-2">
        Medicamentos que afetam as enzimas do fígado
      </label>
      <select
        value={formData.medicamentos}
        onChange={(e) =>
          setFormData({ ...formData, medicamentos: e.target.value })
        }
        className="border p-2 mb-4 w-full"
      >
        <option value="">Selecione</option>
        <option value="false">Não</option>
        <option value="Rifampicin">Rifampicin</option>
        <option value="Anticonvulsivantes">
          Anticonvulsivantes (fenitoína, carbamazepina, barbitúricos, primidona,
          topiramato, oxcarbazepina)
        </option>
      </select>

      <label className="block mb-2">Antibióticos (exceto rifampicina)</label>
      <select
        value={formData.antibioticos}
        onChange={(e) =>
          setFormData({ ...formData, antibioticos: e.target.value })
        }
        className="border p-2 mb-4 w-full"
      >
        <option value="">Selecione</option>
        <option value="false">Não</option>
        <option value="Sim, Griseofulvina">Griseofulvina</option>
        <option value="Sim, Outros antibióticos">Outros antibióticos</option>
      </select>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Analisar
      </button>
    </div>
  );
}
