import React from 'react';
import { Layout, Menu, theme } from 'antd';
import { UserOutlined, FileOutlined, DashboardOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import Link from 'next/link';

const { Header, Content, Sider } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const router = useRouter();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: <Link href="/">Dashboard</Link>,
    },
    {
      key: '/cadastro',
      icon: <UserOutlined />,
      label: <Link href="/cadastro">Cadastro de Pacientes</Link>,
    },
    {
      key: '/resultados',
      icon: <FileOutlined />,
      label: <Link href="/resultados">Resultados</Link>,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ padding: 0, background: colorBgContainer }}>
        <div style={{ 
          padding: '0 24px',
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#1890ff'
        }}>
          Sistema de Gerenciamento de Pacientes
        </div>
      </Header>
      <Layout>
        <Sider width={250} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            selectedKeys={[router.pathname]}
            style={{ height: '100%', borderRight: 0 }}
            items={menuItems}
          />
        </Sider>
        <Layout style={{ padding: '24px' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
