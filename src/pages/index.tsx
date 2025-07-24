import React, { useState, useEffect } from 'react';
import { Table, Input, Card, Button, Space } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import type { ColumnsType } from 'antd/es/table';
import { collection, getDocs } from "firebase/firestore";
import { db } from "@firebase/firebaseConfig";

interface Patient {
  id: string;
  nome: string;
  dataNascimento: string;
  telefone: string;
  email: string;
  genero: 'M' | 'F' | 'OUTRO';
  status: 'ATIVO' | 'INATIVO';
}

const { Search } = Input;

const ListagemPacientes: React.FC = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar pacientes do Firebase
  const fetchPatients = async () => {
    try {
      setLoading(true);
      const patientsCollection = collection(db, "patients");
      const patientsSnapshot = await getDocs(patientsCollection);
      const patientsList = patientsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Patient[];
      setPatients(patientsList);
    } catch (error) {
      console.error("Erro ao buscar pacientes:", error);
    } finally {
      setLoading(false);
    }
  };

  // Carregar pacientes quando o componente montar
  useEffect(() => {
    fetchPatients();
  }, []);

  const columns: ColumnsType<Patient> = [
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
      sorter: (a, b) => a.nome.localeCompare(b.nome),
    },
    {
      title: 'Data de Nascimento',
      dataIndex: 'dataNascimento',
      key: 'dataNascimento',
    },
    {
      title: 'Telefone',
      dataIndex: 'telefone',
      key: 'telefone',
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Gênero',
      dataIndex: 'genero',
      key: 'genero',
      render: (genero: string) => {
        const genderMap = {
          'F': 'Feminino',
          'M': 'Masculino',
          'OUTRO': 'Outro',
        };
        return genderMap[genero as keyof typeof genderMap];
      },
    },
    // {
    //   title: 'Status',
    //   dataIndex: 'status',
    //   key: 'status',
    //   render: (status: string) => (
    //     <Tag color={status === 'ATIVO' ? 'green' : 'red'}>
    //       {status}
    //     </Tag>
    //   ),
    // },
    {
      title: 'Ações',
      key: 'acoes',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="link" 
            onClick={() => router.push(`/cadastro/${record.id}`)}
          >
            Editar
          </Button>
          <Button 
            type="link" 
            onClick={() => router.push(`/formulario/${record.id}`)}
          >
            Formulário
          </Button>
          <Button 
            type="link" 
            onClick={() => router.push(`/resumo/${record.id}`)}
          >
            Resultado
          </Button>
          <Button 
            type="link" 
            onClick={() => router.push(`/resultados/${record.id}`)}
          >
            Resultados
          </Button>
        </Space>
      ),
    },
  ];

  const filteredData = patients.filter(
    (patient) =>
      patient.nome?.toLowerCase().includes(searchText?.toLowerCase()) ||
      patient.email?.toLowerCase().includes(searchText?.toLowerCase())
  );

  return (
    <Card
      title="Listagem de Pacientes"
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => router.push('/cadastro')}
        >
          Novo Paciente
        </Button>
      }
      bordered={false}
    >
      <Space direction="vertical" style={{ width: '100%', marginBottom: 16 }}>
        <Search
          placeholder="Buscar por nome ou e-mail"
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Space>
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        loading={loading}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total de ${total} pacientes`,
        }}
      />
    </Card>
  );
};

export default ListagemPacientes;
