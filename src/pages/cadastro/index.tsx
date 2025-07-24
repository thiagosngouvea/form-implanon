import React, { useState } from 'react';
import { Form, Input, Select, Button, Card, DatePicker, message } from 'antd';
import { collection, addDoc } from "firebase/firestore";
import { db } from "@firebase/firebaseConfig";
import { useRouter } from 'next/router';
import type { Dayjs } from 'dayjs';

const { Option } = Select;

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

  const onFinish = async (values: PatientForm) => {
    try {
      setLoading(true);
      const patientData = {
        ...values,
        dataNascimento: values.dataNascimento.format('DD/MM/YYYY'),
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
    <Card title="Cadastro de Paciente" bordered={false}>
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
          initialValue="ATIVO"
          rules={[{ required: true, message: 'Por favor, selecione o status' }]}
        >
          <Select>
            <Option value="ATIVO">Ativo</Option>
            <Option value="INATIVO">Inativo</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Cadastrar
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={() => router.push('/')}>
            Cancelar
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CadastroPaciente; 