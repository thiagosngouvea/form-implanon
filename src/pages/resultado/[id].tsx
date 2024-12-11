import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@firebase/firebaseConfig"; // Ajuste o caminho se necessário
import { DocumentData } from "firebase/firestore";

export default function Resultado() {
  const router = useRouter();
  const { id } = router.query;  // 'id' é o userId que você passa pela URL

  const [patientData, setPatientData] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [resultado, setResultado] = useState("");


  useEffect(() => {
    if (!id) return;  // Se o ID não estiver disponível, não faz nada

    const fetchPatientData = async () => {
      try {
        // Query para buscar pelo userId na coleção "responses"
        const q = query(collection(db, "responses"), where("userId", "==", id));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // Se encontrado, pega o primeiro documento (deve ser único)
          const doc = querySnapshot.docs[0];
          setPatientData(doc.data());  // Setar os dados do paciente
        } else {
          console.log("Paciente não encontrado");
        }
      } catch (error) {
        console.error("Erro ao buscar dados do paciente:", error);
      } finally {
        setLoading(false);  // Finaliza o loading
      }
    };

    fetchPatientData();  // Chama a função para buscar os dados
  }, [id]);  // Só executa quando 'id' muda
  
      console.log("Resultado do Paciente:", patientData);

  const analisarResultado = () => {

    const array = ['1'];

    if(patientData?.amamentando === "<6_semanas") array.push('3a');
    if(patientData?.fatores_risco === "true") array.push('2');
    if(patientData?.hipertensao === "true") array.push('2c');
    if(patientData?.pressao_elevada === ">=160") array.push('2');
    if(patientData?.doenca_vascular === "true") array.push('2');
    if(patientData?.historico_tvp_ep === "true") array.push('2');
    if(patientData?.tvp_ep_atual === "true") array.push('3');
    if(patientData?.cirurgia_grande_porte === "Com imobilização prolongada") array.push('2');
    if(patientData?.mutacoes_trombogenicas === "true") array.push('2');
    if(patientData?.doenca_cardiaca_atual === "true" && patientData?.inicio === "Inicio do método") array.push('2');
    if(patientData?.doenca_cardiaca_atual === "true" && patientData?.inicio === "Continuação do método") array.push('3');
    if(patientData?.doenca_cardiaca_historia === "true" && patientData?.inicio === "Inicio do método") array.push('2');
    if(patientData?.doenca_cardiaca_historia === "true" && patientData?.inicio === "Continuação do método") array.push('3');
    if(patientData?.derrame === "true" && patientData?.inicio === "Inicio do método") array.push('2');
    if(patientData?.derrame === "true" && patientData?.inicio === "Continuação do método") array.push('3');
    if(patientData?.hiperlipidermia === "true") array.push('2');
    if(patientData?.enxaqueca === "Sim, sem aura" && patientData?.inicio === "Inicio do método") array.push('2');
    if(patientData?.enxaqueca === "Sim, sem aura" && patientData?.inicio === "Continuação do método") array.push('2');
    if(patientData?.enxaqueca === "Sim, com aura" && patientData?.inicio === "Inicio do método") array.push('2');
    if(patientData?.enxaqueca === "Sim, com aura" && patientData?.inicio === "Continuação do método") array.push('3');
    if(patientData?.sangramento_vaginal === "Padrão irregular sem sangramento intenso") array.push('2');
    if(patientData?.sangramento_vaginal === "Sangramento intenso ou prolongado (inclusive padrões regulares e irregulares)") array.push('2');
    if(patientData?.sangramento_vaginal === "Sangramento vaginal inexplicável (suspeita de problema grave) antes da avaliação") array.push('3');
    if(patientData?.neoplasia_cervical === "true") array.push('2');
    if(patientData?.cancer_cervical === "true") array.push('2');
    if(patientData?.doenca_mamaria === "Massa não diagnosticada") array.push('2');
    if(patientData?.cancer_mama === "História de câncer de mama por pelo menos 5 anos") array.push('3');
    if(patientData?.cancer_mama === "Câncer de mama atual") array.push('4');
    if(patientData?.hiv === "Em terapia anti-retroviral") array.push('2');
    if(patientData?.diabetes === "true") array.push('2');
    if(patientData?.doenca_vesicula === "true") array.push('2');
    if(patientData?.colestase === "Relacionada a uso anterior de anticoncepcionais orais combinados") array.push('2');
    if(patientData?.hepatite === "ativa") array.push('3');
    if(patientData?.cirrose === "Compensada") array.push('2');
    if(patientData?.cirrose === "Descompensada") array.push('3');
    if(patientData?.tumores === "Benigno") array.push('3');
    if(patientData?.tumores === "Maligno") array.push('3');
    if(patientData?.medicamentos === "Rifampicin") array.push('3');
    if(patientData?.medicamentos === "Anticonvulsivantes") array.push('3');
    if(patientData?.antibioticos === "Sim, Griseofulvina") array.push('2');
    

    return array;
  }

  useEffect(() => {
    if (!loading && patientData) {
        const resultado = analisarResultado();

        if(resultado.includes('4')) {
            setResultado("Categoria 4 - O método não deve ser usado");
        } else if(resultado.includes('3a')) {
            setResultado("Categoria 3a - Em geral, não se recomenda o uso do método a menos que outros métodos, mais adequados não estejam disponíveis ou sejam aceitáveis ( Em locais onde o risco de morbidade e mortalidade são elevados e este método é um dos poucos contraceptivosamplamente disponíveis, o mesmo poderá ser disponibilizado a mulheres amamentando imediatamente após o parto )");
        } else if(resultado.includes('3')) {
            setResultado("Categoria 3 - Em geral, não se recomenda o uso do método a menos que outros métodos, mais adequados não estejam disponíveis ou sejam aceitáveis");
        } else if(resultado.includes('2')) {
            setResultado("Categoria 2 - De modo geral, use o método");
        } else if(resultado.includes('2c')) {
            setResultado("Categoria 2c - De modo geral, use o método");
        } else if(resultado.includes('1')) {
            setResultado("Categoria 1 - Use o método em qualquer circunstância");
        }

    }
  }, [loading, patientData]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-2xl font-bold text-center mb-4">Resultado do Paciente</div>

        {loading ? (
            <div>Carregando...</div>
        ) : (
            <div>
            <div className="text-xl font-bold mb-4">Resultado: {resultado}</div>
            {/* <div className="text-lg font-bold">Dados do Paciente:</div>
            <pre>{JSON.stringify(patientData, null, 2)}</pre> */}
            </div>
        )}

    </div>
  );
}
