import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card, Descriptions, Timeline, Button, Space, Empty, Spin } from 'antd';
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@firebase/firebaseConfig";
import { DocumentData } from "firebase/firestore";

interface Patient {
  id: string;
  nome: string;
  dataNascimento: string;
  telefone: string;
  email: string;
  genero: 'M' | 'F' | 'OUTRO';
  status: 'ATIVO' | 'INATIVO';
}

const ResultadosPaciente: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [patientData, setPatientData] = useState<Patient | null>(null);
  const [formResponses, setFormResponses] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [resultado, setResultado] = useState("");
  const [motivos, setMotivos] = useState<string[]>([]);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Buscar dados do paciente
        const patientDoc = await getDoc(doc(db, "patients", id as string));
        if (patientDoc.exists()) {
          setPatientData({ id: patientDoc.id, ...patientDoc.data() } as Patient);
        }

        // Buscar respostas do formulário
        const q = query(collection(db, "responses"), where("userId", "==", id));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          const formData = doc.data();
          setFormResponses(formData);
          analisarResultado(formData);
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const analisarResultado = (data: DocumentData) => {
    const array = ['1'];
    const motivosArray: string[] = [];

    if(data?.amamentando === "<6_semanas") {
      array.push('3a');
      motivosArray.push("Amamentando há menos de 6 semanas após o parto");
    }
    if(data?.fatores_risco === "true") {
      array.push('2');
      motivosArray.push("Presença de fatores de risco");
    }
    if(data?.hipertensao === "true") {
      array.push('2c');
      motivosArray.push("Hipertensão");
    }
    if(data?.pressao_elevada === ">=160") {
      array.push('2');
      motivosArray.push("Pressão arterial elevada");
    }
    if(data?.doenca_vascular === "true") {
      array.push('2');
      motivosArray.push("Doença vascular");
    }
    if(data?.historico_tvp_ep === "true") {
      array.push('2');
      motivosArray.push("Histórico de TVP/EP");
    }
    if(data?.tvp_ep_atual === "true") {
      array.push('3');
      motivosArray.push("TVP/EP atual");
    }
    if(data?.cirurgia_grande_porte === "Com imobilização prolongada") {
      array.push('2');
      motivosArray.push("Cirurgia de grande porte com imobilização prolongada");
    }
    if(data?.mutacoes_trombogenicas === "true") {
      array.push('2');
      motivosArray.push("Mutacões trombógenicas");
    }
    if(data?.doenca_cardiaca_atual === "true" && data?.inicio === "Inicio do método") {
      array.push('2');
      motivosArray.push("Doença cardíaca atual iniciando o método");
    }
    if(data?.doenca_cardiaca_atual === "true" && data?.inicio === "Continuação do método") {
      array.push('3');
      motivosArray.push("Doença cardíaca atual continuando o método");
    }
    if(data?.doenca_cardiaca_historia === "true" && data?.inicio === "Inicio do método") {
      array.push('2');
      motivosArray.push("Doença cardíaca histórica iniciando o método");
    }
    if(data?.doenca_cardiaca_historia === "true" && data?.inicio === "Continuação do método") {
      array.push('3');
      motivosArray.push("Doença cardíaca histórica continuando o método");
    }
    if(data?.derrame === "true" && data?.inicio === "Inicio do método") {
      array.push('2');
      motivosArray.push("Derrame iniciando o método");
    }
    if(data?.derrame === "true" && data?.inicio === "Continuação do método") {
      array.push('3');
      motivosArray.push("Derrame continuando o método");
    }
    if(data?.hiperlipidermia === "true") {
      array.push('2');
      motivosArray.push("Hiperlipidermia");
    }
    if(data?.enxaqueca === "Sim, sem aura" && data?.inicio === "Inicio do método") {
      array.push('2');
      motivosArray.push("Enxaqueca sem aura iniciando o método");
    }
    if(data?.enxaqueca === "Sim, sem aura" && data?.inicio === "Continuação do método") {
      array.push('2');
      motivosArray.push("Enxaqueca sem aura continuando o método");
    }
    if(data?.enxaqueca === "Sim, com aura" && data?.inicio === "Inicio do método") {
      array.push('2');
      motivosArray.push("Enxaqueca com aura iniciando o método");
    }
    if(data?.enxaqueca === "Sim, com aura" && data?.inicio === "Continuação do método") {
      array.push('3');
      motivosArray.push("Enxaqueca com aura continuando o método");
    }
    if(data?.sangramento_vaginal === "Padrão irregular sem sangramento intenso") {
      array.push('2');
      motivosArray.push("Sangramento vaginal padrão irregular sem sangramento intenso");
    }
    if(data?.sangramento_vaginal === "Sangramento intenso ou prolongado (inclusive padrões regulares e irregulares)") {
      array.push('2');
      motivosArray.push("Sangramento vaginal intenso ou prolongado");
    }
    if(data?.sangramento_vaginal === "Sangramento vaginal inexplicável (suspeita de problema grave) antes da avaliação") {
      array.push('3');
      motivosArray.push("Sangramento vaginal inexplicável antes da avaliação");
    }
    if(data?.neoplasia_cervical === "true") {
      array.push('2');
      motivosArray.push("Neoplasia cervical");
    }
    if(data?.cancer_cervical === "true") {
      array.push('2');
      motivosArray.push("Câncer de cérvix");
    }
    if(data?.doenca_mamaria === "Massa não diagnosticada") {
      array.push('2');
      motivosArray.push("Massa não diagnosticada");
    }
    if(data?.cancer_mama === "História de câncer de mama por pelo menos 5 anos") {
      array.push('3');
      motivosArray.push("História de câncer de mama por pelo menos 5 anos");
    }
    if(data?.cancer_mama === "Câncer de mama atual") {
      array.push('4');
      motivosArray.push("Câncer de mama atual");
    }
    if(data?.hiv === "Em terapia anti-retroviral") {
      array.push('2');
      motivosArray.push("Em terapia anti-retroviral");
    }
    if(data?.diabetes === "true") {
      array.push('2');
      motivosArray.push("Diabetes");
    }
    if(data?.doenca_vesicula === "true") {
      array.push('2');
      motivosArray.push("Doença vesicular");
    }
    if(data?.colestase === "Relacionada a uso anterior de anticoncepcionais orais combinados") {
      array.push('2');
      motivosArray.push("Colestase relacionada ao uso anterior de anticoncepcionais orais combinados");
    }
    if(data?.hepatite === "ativa") {
      array.push('3');
      motivosArray.push("Hepatite ativa");
    }
    if(data?.cirrose === "Compensada") {
      array.push('2');
      motivosArray.push("Cirrose compensada");
    }
    if(data?.cirrose === "Descompensada") {
      array.push('3');
      motivosArray.push("Cirrose descompensada");
    }
    if(data?.tumores === "Benigno") {
      array.push('3');
      motivosArray.push("Tumor benigno");
    }
    if(data?.tumores === "Maligno") {
      array.push('3');
      motivosArray.push("Tumor maligno");
    }
    if(data?.medicamentos === "Rifampicin") {
      array.push('3');
      motivosArray.push("Uso de Rifampicin");
    }
    if(data?.medicamentos === "Anticonvulsivantes") {
      array.push('3');
      motivosArray.push("Uso de Anticonvulsivantes");
    }
    if(data?.antibioticos === "Sim, Griseofulvina") {
      array.push('2');
      motivosArray.push("Uso de antibiótico Griseofulvina");
    }

    setMotivos(motivosArray);

    if(array.includes('4')) {
      setResultado("Categoria 4 - O método não deve ser usado");
    } else if(array.includes('3a')) {
      setResultado("Categoria 3a - Em geral, não se recomenda o uso do método a menos que outros métodos, mais adequados não estejam disponíveis ou sejam aceitáveis ( Em locais onde o risco de morbidade e mortalidade são elevados e este método é um dos poucos contraceptivosamplamente disponíveis, o mesmo poderá ser disponibilizado a mulheres amamentando imediatamente após o parto )");
    } else if(array.includes('3')) {
      setResultado("Categoria 3 - Em geral, não se recomenda o uso do método a menos que outros métodos, mais adequados não estejam disponíveis ou sejam aceitáveis");
    } else if(array.includes('2')) {
      setResultado("Categoria 2 - De modo geral, use o método");
    } else if(array.includes('2c')) {
      setResultado("Categoria 2c - De modo geral, use o método");
    } else if(array.includes('1')) {
      setResultado("Categoria 1 - Use o método em qualquer circunstância");
    }
  };

  const getStatusColor = () => {
    const colors = {
      '4': 'red',
      '3a': 'orange',
      '3': 'orange',
      '2': 'gold',
      '2c': 'gold',
      '1': 'green',
    };
    // Extrair o número da categoria do resultado
    const category = resultado.match(/Categoria (\d[a-z]?)/)?.[1] || '1';
    return colors[category as keyof typeof colors];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <Space direction="vertical" size="large" style={{ width: '100%', padding: '24px' }}>
        <Space>
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={() => router.back()}
          >
            Voltar
          </Button>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => router.push(`/formulario/${id}`)}
          >
            Novo Formulário
          </Button>
        </Space>

        {patientData && (
          <Card title="Informações do Paciente" bordered={false}>
            <Descriptions column={2}>
              <Descriptions.Item label="Nome">{patientData.nome}</Descriptions.Item>
              <Descriptions.Item label="Data de Nascimento">
                {patientData.dataNascimento}
              </Descriptions.Item>
              <Descriptions.Item label="Telefone">{patientData.telefone}</Descriptions.Item>
              <Descriptions.Item label="E-mail">{patientData.email}</Descriptions.Item>
              <Descriptions.Item label="Gênero">
                {patientData.genero === 'F' ? 'Feminino' : 
                 patientData.genero === 'M' ? 'Masculino' : 'Outro'}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                {patientData.status === 'ATIVO' ? 'Ativo' : 'Inativo'}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        )}

        {formResponses && (
          <Card title="Resultado da Avaliação" bordered={false}>
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2" style={{ color: getStatusColor() }}>
                {resultado}
              </h3>
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
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-bold mb-4">Respostas do Formulário:</h3>
              <Timeline
                mode="left"
                items={Object.entries(formResponses)
                  .filter(([key]) => !['userId', 'submittedAt'].includes(key))
                  .map(([key, value]) => ({
                    color: value === 'true' ? 'red' : 'blue',
                    label: new Date(formResponses.submittedAt).toLocaleDateString(),
                    children: (
                      <div>
                        <h4>{key.replace(/_/g, ' ').toUpperCase()}</h4>
                        <p>{value.toString()}</p>
                      </div>
                    ),
                  }))}
              />
            </div>
          </Card>
        )}

        {!formResponses && (
          <Card title="Histórico de Avaliações" bordered={false}>
            <Empty description="Nenhuma avaliação encontrada" />
          </Card>
        )}
      </Space>
    </>
  );
};

export default ResultadosPaciente; 