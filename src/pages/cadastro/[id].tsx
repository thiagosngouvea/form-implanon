import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, Card, DatePicker, message, Spin } from 'antd';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@firebase/firebaseConfig";
import { useRouter } from 'next/router';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

const { Option } = Select;

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
        ...values,
        dataNascimento: values.dataNascimento.format('DD/MM/YYYY'),
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
    <Card title="Editar Paciente" bordered={false}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="nome"
          label="Nome"
          rules={[{ required: true, message: 'Por favor, insira o nome' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="dataNascimento"
          label="Data de Nascimento"
          rules={[{ required: true, message: 'Por favor, insira a data de nascimento' }]}
        >
          <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="telefone"
          label="Telefone"
          rules={[{ required: true, message: 'Por favor, insira o telefone' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            { required: true, message: 'Por favor, insira o e-mail' },
            { type: 'email', message: 'Por favor, insira um e-mail válido' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="genero"
          label="Gênero"
          rules={[{ required: true, message: 'Por favor, selecione o gênero' }]}
        >
          <Select>
            <Option value="F">Feminino</Option>
            <Option value="M">Masculino</Option>
            <Option value="OUTRO">Outro</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: 'Por favor, selecione o status' }]}
        >
          <Select>
            <Option value="ATIVO">Ativo</Option>
            <Option value="INATIVO">Inativo</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={submitting}>
            Salvar
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={() => router.push('/')}>
            Cancelar
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default EditarPaciente; 