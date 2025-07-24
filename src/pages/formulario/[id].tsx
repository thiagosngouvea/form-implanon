import React, { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@firebase/firebaseConfig";
import { useRouter } from "next/router";
import { Spin, message, Form, Select, Button, Typography, Space } from 'antd';
const { Title } = Typography;
const { Option } = Select;

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

export default function FormularioImplanon() {
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setIsLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  
  const [form] = Form.useForm();

  useEffect(() => {
    if (!router.isReady) return;
    
    if (id) {
      setIsLoading(false);
    } else {
      messageApi.error('ID do paciente não encontrado');
      router.push('/');
    }
  }, [router.isReady, id]);

  const handleSubmit = async (values: FormData) => {
    try {
      setIsLoading(true);
      // Substitui valores null/undefined por ""
      const sanitizedValues = Object.fromEntries(
        Object.entries(values).map(([key, value]) => [key, value == null ? "" : value])
      );
      await addDoc(collection(db, "responses"), {
        ...sanitizedValues,
        userId: id as string ?? "",
        submittedAt: new Date().toISOString(),
      });
      messageApi.success('Formulário enviado com sucesso!');
      router.push(`/resultado/${id}`);
    } catch (error) {
      messageApi.error('Erro ao enviar formulário');
      console.error("Erro ao enviar respostas:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderFormItem = (
    name: keyof FormData,
    label: string,
    options: { value: string; label: string }[]
  ) => (
    <Form.Item
      name={name}
      label={label}
    >
      <Select placeholder="Selecione uma opção">
        {options.map(option => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" tip="Carregando..." />
      </div>
    );
  }

  return (
    <>
      {contextHolder}
      <div style={{ padding: '24px' }}>
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <Title level={2} style={{ textAlign: 'center' }}>
            Formulário de Avaliação para Implanon
          </Title>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            style={{ maxWidth: 800, margin: '0 auto' }}
          >
            {/* Form items */}
            {renderFormItem("inicio", "Histórico de Uso do Implanon", [
              { value: "Inicio do método", label: "Início do método" },
              { value: "Continuação do método", label: "Continuação do método" }
            ])}

            {renderFormItem("amamentando", "Amamentação", [
              { value: "<6_semanas", label: "Menos de 6 semanas após o parto" },
              { value: "6_6_meses", label: "De 6 semanas a 6 meses após o parto" },
              { value: ">6_meses", label: "Mais de 6 meses após o parto" }
            ])}

            {renderFormItem("fatores_risco", "Múltiplos fatores de risco de doença cardiovascular arterial", [
              { value: "false", label: "Não" },
              { value: "true", label: "Sim" }
            ])}

            {renderFormItem("hipertensao", "Histórico de hipertensão onde a pressão NÃO POSSA ser avaliada", [
              { value: "false", label: "Não" },
              { value: "true", label: "Sim" }
            ])}

            {renderFormItem("hipertensao_controlada", "Hipertensão controlada onde a pressão POSSA ser avaliada", [
              { value: "false", label: "Não" },
              { value: "true", label: "Sim" }
            ])}

            {renderFormItem("pressao_elevada", "Pressão arterial elevada", [
              { value: "140-159", label: "Sistólica 140–159 ou diastólica 90–99" },
              { value: ">=160", label: "Sistólica >= 160 ou diastólica >= 100" }
            ])}

            {renderFormItem("doenca_vascular", "Doença vascular", [
              { value: "false", label: "Não" },
              { value: "true", label: "Sim" }
            ])}

            {renderFormItem("historico_tvp_ep", "Histórico de TVP/EP", [
              { value: "false", label: "Não" },
              { value: "true", label: "Sim" }
            ])}

            {renderFormItem("tvp_ep_atual", "TVP/EP atual", [
              { value: "false", label: "Não" },
              { value: "true", label: "Sim" }
            ])}

            {renderFormItem("historia_familiar_tvp_ep", "História familiar de TVP/EP (parentes de primeiro grau)", [
              { value: "false", label: "Não" },
              { value: "true", label: "Sim" }
            ])}

            {renderFormItem("cirurgia_grande_porte", "Cirurgia de grande porte", [
              { value: "false", label: "Não" },
              { value: "true", label: "Sim" },
              { value: "Com imobilização prolongada", label: "Com imobilização prolongada" },
              { value: "Sem imobilização prolongada", label: "Sem imobilização prolongada" }
            ])}

            {renderFormItem("cirurgia_pequeno_porte", "Cirurgia de pequeno porte sem imobilização", [
              { value: "false", label: "Não" },
              { value: "true", label: "Sim" }
            ])}

            {renderFormItem("mutacoes_trombogenicas", "Mutações trombogênicas conhecidas", [
              { value: "false", label: "Não" },
              { value: "true", label: "Sim" }
            ])}

            {renderFormItem("doenca_cardiaca_atual", "Doença cardíaca isquêmica atual", [
              { value: "false", label: "Não" },
              { value: "true", label: "Sim" }
            ])}

            {renderFormItem("doenca_cardiaca_historia", "História de doença cardíaca isquêmica", [
              { value: "false", label: "Não" },
              { value: "true", label: "Sim" }
            ])}

            {renderFormItem("derrame", "Derrame (AVC)", [
              { value: "false", label: "Não" },
              { value: "true", label: "Sim" }
            ])}

            {renderFormItem("hiperlipidermia", "Hiperlipidermias conhecidas", [
              { value: "false", label: "Não" },
              { value: "true", label: "Sim" }
            ])}

            {renderFormItem("enxaqueca", "Enxaqueca", [
              { value: "false", label: "Não" },
              { value: "Sim, sem aura", label: "Sim, sem aura" },
              { value: "Sim, com aura", label: "Sim, com aura" }
            ])}

            {renderFormItem("sangramento_vaginal", "Padrões de sangramento vaginal", [
              { value: "false", label: "Não" },
              { value: "Padrão irregular sem sangramento intenso", label: "Padrão irregular sem sangramento intenso" },
              { value: "Sangramento intenso ou prolongado", label: "Sangramento intenso ou prolongado" },
              { value: "Sangramento vaginal inexplicável", label: "Sangramento vaginal inexplicável" }
            ])}

            {renderFormItem("neoplasia_cervical", "Neoplasia intraepitelial cervical (NIC)", [
              { value: "false", label: "Não" },
              { value: "true", label: "Sim" }
            ])}

            {renderFormItem("cancer_cervical", "Câncer cervical (aguardando tratamento)", [
              { value: "false", label: "Não" },
              { value: "true", label: "Sim" }
            ])}

            {renderFormItem("doenca_mamaria", "Doença mamária", [
              { value: "false", label: "Não" },
              { value: "Massa não diagnosticada", label: "Massa não diagnosticada" },
              { value: "Doença mamária benigna", label: "Doença mamária benigna" },
              { value: "Histórico de câncer na família", label: "Histórico de câncer na família" }
            ])}

            {renderFormItem("cancer_mama", "Câncer de mama", [
              { value: "false", label: "Não" },
              { value: "História de câncer de mama por pelo menos 5 anos", label: "História de câncer de mama por pelo menos 5 anos" },
              { value: "Câncer de mama atual", label: "Câncer de mama atual" }
            ])}

            {renderFormItem("hiv", "HIV/Aids", [
              { value: "false", label: "Não tem" },
              { value: "Alto risco de HIV", label: "Alto risco de HIV" },
              { value: "Infectada com o HIV", label: "Infectada com o HIV" },
              { value: "Com Aids", label: "Com Aids" },
              { value: "Em terapia anti-retroviral", label: "Em terapia anti-retroviral" }
            ])}

            {renderFormItem("diabetes", "Diabetes", [
              { value: "false", label: "Não" },
              { value: "Sim", label: "Sim" },
              { value: "História de diabetes gestacional", label: "História de diabetes gestacional" }
            ])}

            {renderFormItem("doenca_vesicula", "Doença da vesícula biliar", [
              { value: "false", label: "Não" },
              { value: "Sim", label: "Sim" }
            ])}

            {renderFormItem("colestase", "História de Colestase", [
              { value: "Relacionada à gravidez", label: "Relacionada à gravidez" },
              { value: "Relacionada a uso anterior de anticoncepcionais orais combinados", label: "Relacionada a uso anterior de anticoncepcionais orais combinados" }
            ])}

            {renderFormItem("hepatite", "Hepatite viral", [
              { value: "false", label: "Não" },
              { value: "Ativa", label: "Ativa" },
              { value: "Portador", label: "Portador" }
            ])}

            {renderFormItem("cirrose", "Cirrose hepática", [
              { value: "false", label: "Não" },
              { value: "Compensada", label: "Moderada (Compensada)" },
              { value: "Descompensada", label: "Aguda (Descompensada)" }
            ])}

            {renderFormItem("tumores", "Tumores hepáticos", [
              { value: "false", label: "Não" },
              { value: "Benigno", label: "Benigno" },
              { value: "Maligno", label: "Maligno" }
            ])}

            {renderFormItem("medicamentos", "Medicamentos que afetam as enzimas do fígado", [
              { value: "false", label: "Não" },
              { value: "Rifampicin", label: "Rifampicin" },
              { value: "Anticonvulsivantes", label: "Anticonvulsivantes" }
            ])}

            {renderFormItem("antibioticos", "Antibióticos (exceto rifampicina)", [
              { value: "false", label: "Não" },
              { value: "Sim, Griseofulvina", label: "Griseofulvina" },
              { value: "Sim, Outros antibióticos", label: "Outros antibióticos" }
            ])}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                size="large"
                block
              >
                {isLoading ? "Enviando..." : "Enviar Formulário"}
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </div>
    </>
  );
} 