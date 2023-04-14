import { FC, memo } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Container from 'src/shared-components/Container';
import Header from 'src/shared-components/Header';
import Navigation from './Navigation';

const { Sider, Content } = Layout;

const Page: FC = memo(() => {
  return (
    <Layout hasSider>
      <Sider
        theme="light"
        breakpoint="md"
        collapsedWidth="0"
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
        width={236}
        onBreakpoint={broken => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        className="border-r border-gray2"
      >
        <div className="h-8 m-4 bg-gray">
          <img src="/logo.png" alt="MarineMax" />
        </div>
        <Navigation />
      </Sider>
      <Layout style={{ marginLeft: 236 }}>
        <Header />
        <Content className="px-6 pt-24 !min-h-screen">
          <Container>
            <Outlet />
          </Container>
        </Content>
      </Layout>
    </Layout>
  )
});

Page.displayName = 'Page';

export default Page;
