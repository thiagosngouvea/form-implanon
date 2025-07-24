import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import MainLayout from '@/layout';
import { ConfigProvider } from 'antd';
import ptBR from 'antd/locale/pt_BR';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider
      locale={ptBR}
      theme={{
        token: {
          colorPrimary: '#1890ff',
        },
      }}
    >
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ConfigProvider>
  );
}
