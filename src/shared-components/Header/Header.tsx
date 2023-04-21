import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Dropdown, Menu } from 'antd';
import { CaretDownOutlined, LockOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';

import { useAuth } from 'src/hooks/useAuth';
import { trns } from './messages';

const { Header } = Layout;

const HeaderComponent = memo(() => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <a className="flex items-center !text-red6" onClick={handleLogout}>
          <LockOutlined />
          <span className="ml-3">
            <FormattedMessage {...trns.logout} />
          </span>
        </a>
      </Menu.Item>
    </Menu>
  );
  return (
    <Header
      className="fixed z-10 flex !bg-white justify-end items-center border-b border-gray2"
      style={{ width: 'calc(100% - 200px)' }}
    >
      <Dropdown overlay={menu} placement="bottomCenter" trigger={['click']}>
        <a className="flex items-center" onClick={(e) => e.preventDefault()}>
          <span className="mr-4">
            <FormattedMessage {...trns.hello} />, {user?.nickname}
          </span>
          <CaretDownOutlined />
        </a>
      </Dropdown>
    </Header>
  );
});

HeaderComponent.displayName = 'HeaderComponent';

export default HeaderComponent;
