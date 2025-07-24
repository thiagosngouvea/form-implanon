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
  const [motivos, setMotivos] = useState<string[]>([]);  // Novo estado para os motivos


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
    const motivosArray: string[] = [];  // Array para armazenar os motivos

    if(patientData?.amamentando === "<6_semanas") {
      array.push('3a');
      motivosArray.push("Amamentando há menos de 6 semanas após o parto");
    }
    if(patientData?.fatores_risco === "true") {
      array.push('2');
      motivosArray.push("Presença de fatores de risco");
    }
    if(patientData?.hipertensao === "true") {
      array.push('2c');
      motivosArray.push("Hipertensão");
    }
    if(patientData?.pressao_elevada === ">=160") {
      array.push('2');
      motivosArray.push("Pressão arterial elevada");
    }
    if(patientData?.doenca_vascular === "true") {
      array.push('2');
      motivosArray.push("Doença vascular");
    }
    if(patientData?.historico_tvp_ep === "true") {
      array.push('2');
      motivosArray.push("Histórico de TVP/EP");
    }
    if(patientData?.tvp_ep_atual === "true") {
      array.push('3');
      motivosArray.push("TVP/EP atual");
    }
    if(patientData?.cirurgia_grande_porte === "Com imobilização prolongada") {
      array.push('2');
      motivosArray.push("Cirurgia de grande porte com imobilização prolongada");
    }
    if(patientData?.mutacoes_trombogenicas === "true") {
      array.push('2');
      motivosArray.push("Mutacões trombógenicas");
    }
    if(patientData?.doenca_cardiaca_atual === "true" && patientData?.inicio === "Inicio do método") {
      array.push('2');
      motivosArray.push("Doença cardíaca atual iniciando o método");
    }
    if(patientData?.doenca_cardiaca_atual === "true" && patientData?.inicio === "Continuação do método") {
      array.push('3');
      motivosArray.push("Doença cardíaca atual continuando o método");
    }
    if(patientData?.doenca_cardiaca_historia === "true" && patientData?.inicio === "Inicio do método") {
      array.push('2');
      motivosArray.push("Doença cardíaca histórica iniciando o método");
    }
    if(patientData?.doenca_cardiaca_historia === "true" && patientData?.inicio === "Continuação do método") {
      array.push('3');
      motivosArray.push("Doença cardíaca histórica continuando o método");
    }
    if(patientData?.derrame === "true" && patientData?.inicio === "Inicio do método") {
      array.push('2');
      motivosArray.push("Derrame iniciando o método");
    }
    if(patientData?.derrame === "true" && patientData?.inicio === "Continuação do método") {
      array.push('3');
      motivosArray.push("Derrame continuando o método");
    }
    if(patientData?.hiperlipidermia === "true") {
      array.push('2');
      motivosArray.push("Hiperlipidermia");
    }
    if(patientData?.enxaqueca === "Sim, sem aura" && patientData?.inicio === "Inicio do método") {
      array.push('2');
      motivosArray.push("Enxaqueca sem aura iniciando o método");
    }
    if(patientData?.enxaqueca === "Sim, sem aura" && patientData?.inicio === "Continuação do método") {
      array.push('2');
      motivosArray.push("Enxaqueca sem aura continuando o método");
    }
    if(patientData?.enxaqueca === "Sim, com aura" && patientData?.inicio === "Inicio do método") {
      array.push('2');
      motivosArray.push("Enxaqueca com aura iniciando o método");
    }
    if(patientData?.enxaqueca === "Sim, com aura" && patientData?.inicio === "Continuação do método") {
      array.push('3');
      motivosArray.push("Enxaqueca com aura continuando o método");
    }
    if(patientData?.sangramento_vaginal === "Padrão irregular sem sangramento intenso") {
      array.push('2');
      motivosArray.push("Sangramento vaginal padrão irregular sem sangramento intenso");
    }
    if(patientData?.sangramento_vaginal === "Sangramento intenso ou prolongado (inclusive padrões regulares e irregulares)") {
      array.push('2');
      motivosArray.push("Sangramento vaginal intenso ou prolongado");
    }
    if(patientData?.sangramento_vaginal === "Sangramento vaginal inexplicável (suspeita de problema grave) antes da avaliação") {
      array.push('3');
      motivosArray.push("Sangramento vaginal inexplicável antes da avaliação");
    }
    if(patientData?.neoplasia_cervical === "true") {
      array.push('2');
      motivosArray.push("Neoplasia cervical");
    }
    if(patientData?.cancer_cervical === "true") {
      array.push('2');
      motivosArray.push("Câncer de cérvix");
    }
    if(patientData?.doenca_mamaria === "Massa não diagnosticada") {
      array.push('2');
      motivosArray.push("Massa não diagnosticada");
    }
    if(patientData?.cancer_mama === "História de câncer de mama por pelo menos 5 anos") {
      array.push('3');
      motivosArray.push("História de câncer de mama por pelo menos 5 anos");
    }
    if(patientData?.cancer_mama === "Câncer de mama atual") {
      array.push('4');
      motivosArray.push("Câncer de mama atual");
    }
    if(patientData?.hiv === "Em terapia anti-retroviral") {
      array.push('2');
      motivosArray.push("Em terapia anti-retroviral");
    }
    if(patientData?.diabetes === "true") {
      array.push('2');
      motivosArray.push("Diabetes");
    }
    if(patientData?.doenca_vesicula === "true") {
      array.push('2');
      motivosArray.push("Doença vesicular");
    }
    if(patientData?.colestase === "Relacionada a uso anterior de anticoncepcionais orais combinados") {
      array.push('2');
      motivosArray.push("Colestase relacionada ao uso anterior de anticoncepcionais orais combinados");
    }
    if(patientData?.hepatite === "ativa") {
      array.push('3');
      motivosArray.push("Hepatite ativa");
    }
    if(patientData?.cirrose === "Compensada") {
      array.push('2');
      motivosArray.push("Cirrose compensada");
    }
    if(patientData?.cirrose === "Descompensada") {
      array.push('3');
      motivosArray.push("Cirrose descompensada");
    }
    if(patientData?.tumores === "Benigno") {
      array.push('3');
      motivosArray.push("Tumor benigno");
    }
    if(patientData?.tumores === "Maligno") {
      array.push('3');
      motivosArray.push("Tumor maligno");
    }
    if(patientData?.medicamentos === "Rifampicin") {
      array.push('3');
      motivosArray.push("Uso de Rifampicin");
    }
    if(patientData?.medicamentos === "Anticonvulsivantes") {
      array.push('3');
      motivosArray.push("Uso de Anticonvulsivantes");
    }
    if(patientData?.antibioticos === "Sim, Griseofulvina") {
      array.push('2');
      motivosArray.push("Uso de antibiótico Griseofulvina");
    }
    

    setMotivos(motivosArray);  // Armazena os motivos no estado
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
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-2xl font-bold text-center mb-4">Resultado do Paciente</div>

      {loading ? (
        <div>Carregando...</div>
      ) : (
        <div className="w-full max-w-2xl">
          <div className="text-xl font-bold mb-4">Resultado: {resultado}</div>
          
          {motivos.length > 0 && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <div className="font-bold mb-2">Motivos para esta classificação:</div>
              <ul className="list-disc pl-5">
                {motivos.map((motivo, index) => (
                  <li key={index} className="mb-1">{motivo}</li>
                ))}
              </ul>
            </div>
          )}
          
          <button
            onClick={() => router.push("/")}
            className="bg-blue-500 text-white rounded-md p-2 mt-4 w-32"
          >
            Voltar
          </button>
        </div>
      )}
    </div>
  );
}
