import React, { useState } from 'react';
import { Form, Input, Select, Button, Card, DatePicker, message, Row, Col, Grid } from 'antd';
import { collection, addDoc } from "firebase/firestore";
import { db } from "@firebase/firebaseConfig";
import { useRouter } from 'next/router';
import type { Dayjs } from 'dayjs';

const { Option } = Select;
const { useBreakpoint } = Grid;

interface PatientForm {
  nome: string;
  dataNascimento: Dayjs;
  telefone: string;
  email: string;
  genero: 'M' | 'F' | 'OUTRO';
  status: 'ATIVO' | 'INATIVO';
}

const CadastroPaciente: React.FC = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const screens = useBreakpoint();
  // Considera mobile se não for lg nem maior
  const isMobile = !screens.lg;

  const onFinish = async (values: PatientForm) => {
    try {
      setLoading(true);
      const patientData = {
        nome: values.nome || "",
        dataNascimento: values.dataNascimento ? values.dataNascimento.format('DD/MM/YYYY') : null,
        telefone: values.telefone || "",
        email: values.email || "",
        genero: values.genero || "",
        status: 'ATIVO',
        createdAt: new Date().toISOString()
      };

      await addDoc(collection(db, "patients"), patientData);
      message.success('Paciente cadastrado com sucesso!');
      router.push('/'); // Volta para a listagem
    } catch (error) {
      console.error("Erro ao cadastrar paciente:", error);
      message.error('Erro ao cadastrar paciente. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card 
      title="Cadastro de Paciente" 
      bordered={false}
      style={{ 
        margin: isMobile ? '8px' : '24px',
        padding: isMobile ? '12px' : '24px' 
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        style={{ width: '100%' }}
      >
        <Row gutter={[16, 0]}>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              name="nome"
              label="Nome"
              rules={[{ required: true, message: 'Por favor, insira o nome' }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12}>
            <Form.Item
              name="dataNascimento"
              label="Data de Nascimento"
            >
              <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12}>
            <Form.Item
              name="telefone"
              label="Telefone"
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12}>
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                { type: 'email', message: 'Por favor, insira um e-mail válido' }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12}>
            <Form.Item
              name="genero"
              label="Gênero"
            >
              <Select>
                <Option value="F">Feminino</Option>
                <Option value="M">Masculino</Option>
                <Option value="OUTRO">Outro</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item style={{ marginTop: '24px', textAlign: isMobile ? 'center' : 'right' }}>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading}
            style={{ width: isMobile ? '100%' : 'auto' }}
          >
            Cadastrar
          </Button>
          <Button 
            style={{ 
              marginLeft: isMobile ? 0 : 8,
              marginTop: isMobile ? 8 : 0,
              width: isMobile ? '100%' : 'auto'
            }} 
            onClick={() => router.push('/')}
          >
            Cancelar
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CadastroPaciente; 