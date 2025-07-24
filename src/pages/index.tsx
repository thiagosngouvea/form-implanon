import React, { useState, useEffect } from 'react';
import { Table, Input, Card, Button, Space, Dropdown, Grid } from 'antd';
import { SearchOutlined, PlusOutlined, MoreOutlined, EditOutlined, FileOutlined, BarChartOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import type { ColumnsType } from 'antd/es/table';
import { collection, getDocs } from "firebase/firestore";
import { db } from "@firebase/firebaseConfig";

const { useBreakpoint } = Grid;

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

  // Usando o sistema de breakpoints do antd
  const screens = useBreakpoint();
  // Considera mobile se não for lg nem maior
  const isMobile = !screens.lg;

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

  const getActionMenu = (record: Patient) => ({
    items: [
      {
        key: 'edit',
        label: 'Editar',
        onClick: () => router.push(`/cadastro/${record.id}`),
      },
      {
        key: 'form',
        label: 'Formulário',
        onClick: () => router.push(`/formulario/${record.id}`),
      },
      {
        key: 'result',
        label: 'Resultado',
        onClick: () => router.push(`/resumo/${record.id}`),
      },
    ],
  });

  const mobileColumns: ColumnsType<Patient> = [
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
      sorter: (a, b) => a.nome.localeCompare(b.nome),
      render: (nome, record) => (
        <div>
          <div>{nome}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{record.email}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{record.telefone}</div>
        </div>
      ),
    },
    {
      title: 'Ações',
      key: 'acoes',
      width: 50,
      render: (_, record) => (
        <Dropdown menu={getActionMenu(record)} trigger={['click']}>
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const desktopColumns: ColumnsType<Patient> = [
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
    {
      title: 'Ações',
      key: 'acoes',
      render: (_, record) => (
        <Space size="large">
          <Button 
            type="link" 
            onClick={() => router.push(`/cadastro/${record.id}`)}
          >
            <EditOutlined 
              style={{
                color: '#1890ff',
              }}
              size={24}
            />
          </Button>
          <Button 
            type="link" 
            onClick={() => router.push(`/formulario/${record.id}`)}
          >
            <FileOutlined 
              style={{
                color: '#1890ff',
              }}
              size={24}
            />
          </Button>
          <Button 
            type="link" 
            onClick={() => router.push(`/resumo/${record.id}`)}
          >
            <BarChartOutlined 
              style={{
                color: '#1890ff',
              }}
              size={24}
            />
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
      title={
        isMobile ? (
          <div>
            <div>Listagem de Pacientes</div>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => router.push('/cadastro')}
              style={{ width: '100%', marginTop: 8 }}
              block
            >
              Novo Paciente
            </Button>
          </div>
        ) : (
          "Listagem de Pacientes"
        )
      }
      extra={
        !isMobile && (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => router.push('/cadastro')}
            style={{ width: 'auto' }}
          >
            Novo Paciente
          </Button>
        )
      }
      bordered={false}
      style={{ 
        margin: isMobile ? '8px' : '8px',
        padding: isMobile ? '12px' : '12px' 
      }}
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
        columns={isMobile ? mobileColumns : desktopColumns}
        dataSource={filteredData}
        rowKey="id"
        loading={loading}
        pagination={{
          pageSize: isMobile ? 5 : 10,
          showSizeChanger: !isMobile,
          showTotal: (total) => `Total de ${total} pacientes`,
          size: isMobile ? 'small' : 'default',
        }}
        scroll={{ x: true }}
      />
    </Card>
  );
};

export default ListagemPacientes;
