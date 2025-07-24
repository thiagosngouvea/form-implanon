import React, { useState } from 'react';
import { Layout, Menu, theme, Button, Grid } from 'antd';
import { UserOutlined, DashboardOutlined, MenuOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import Link from 'next/link';

const { Header, Content, Sider } = Layout;
const { useBreakpoint } = Grid;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const screens = useBreakpoint();
  // Considera mobile se não for lg nem maior
  const isMobile = !screens.lg;

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
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ 
        padding: 0, 
        background: colorBgContainer,
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
      }}>
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: '16px',
            width: 64,
            height: 64,
          }}
        />
        <div style={{ 
          padding: '0 24px',
          fontSize: isMobile ? '16px' : '20px',
          fontWeight: 'bold',
          color: '#1890ff',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          Sistema de Gerenciamento de Pacientes
        </div>
      </Header>
      <Layout>
        <Sider
          width={250}
          style={{
            background: colorBgContainer,
            position: isMobile ? 'fixed' : 'relative',
            height: '100vh',
            left: 0,
            top: 64,
            zIndex: 2,
            display: isMobile && !collapsed ? 'block' : (isMobile ? 'none' : 'block'),
          }}
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          breakpoint="lg"
          collapsedWidth={isMobile ? 0 : 80}
        >
          <Menu
            mode="inline"
            selectedKeys={[router.pathname]}
            style={{ height: '100%', borderRight: 0 }}
            items={menuItems}
          />
        </Sider>
        <Layout style={{ 
          padding: isMobile ? '12px' : '24px',
          marginLeft: isMobile ? 0 : 40
        }}>
          <Content
            style={{
              padding: isMobile ? 12 : 24,
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
