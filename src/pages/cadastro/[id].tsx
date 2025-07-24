import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, Card, DatePicker, message, Spin, Row, Col, Grid } from 'antd';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@firebase/firebaseConfig";
import { useRouter } from 'next/router';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

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

const EditarPaciente: React.FC = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const screens = useBreakpoint();
  // Considera mobile se não for lg nem maior
  const isMobile = !screens.lg;

  useEffect(() => {
    if (id) {
      fetchPatientData();
    }
  }, [id]);

  const fetchPatientData = async () => {
    try {
      const docRef = doc(db, "patients", id as string);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        form.setFieldsValue({
          ...data,
          dataNascimento: dayjs(data.dataNascimento, 'DD/MM/YYYY'),
        });
      } else {
        message.error('Paciente não encontrado');
        router.push('/');
      }
    } catch (error) {
      console.error("Erro ao buscar dados do paciente:", error);
      message.error('Erro ao carregar dados do paciente');
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values: PatientForm) => {
    try {
      setSubmitting(true);
      const patientData = {
        nome: values.nome || "",
        dataNascimento: values.dataNascimento ? values.dataNascimento.format('DD/MM/YYYY') : null,
        telefone: values.telefone || "",
        email: values.email || "",
        genero: values.genero || "",
        status: values.status || "",
        updatedAt: new Date().toISOString()
      };

      const docRef = doc(db, "patients", id as string);
      await updateDoc(docRef, patientData);
      
      message.success('Paciente atualizado com sucesso!');
      router.push('/');
    } catch (error) {
      console.error("Erro ao atualizar paciente:", error);
      message.error('Erro ao atualizar paciente. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Card 
      title="Editar Paciente" 
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
            loading={submitting}
            style={{ width: isMobile ? '100%' : 'auto' }}
          >
            Salvar
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

export default EditarPaciente; 