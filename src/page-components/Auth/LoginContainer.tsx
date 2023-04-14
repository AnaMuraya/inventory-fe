import { memo, useEffect } from 'react';
import { Row, Col, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { useAuth, LoginPayload } from '../../hooks/useAuth';
import LoginForm from './LoginForm';
import { trns } from './messages';

const loginScreenImage = `${process.env.PUBLIC_URL}/images/login/login_screen.png`;

const LoginContainer = memo(() => {
  const { login, user, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (payload: LoginPayload) => {
    login(payload);
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <Row className="h-screen">
      <Col span={14}>
        <div style={{ background: `url(${loginScreenImage})` }} className="h-full" />
      </Col>
      <Col span={10}>
        <div className="h-full flex flex-col justify-center px-24">
          <Spin delay={200} spinning={isLoading}>
            <h3 className="mb-14 text-primary text-2xl">
              <FormattedMessage {...trns.login} />
            </h3>
            <LoginForm onSubmit={handleLogin} />
          </Spin>
        </div>
      </Col>
    </Row>
  );
});

LoginContainer.displayName = 'LoginContainer';

export default LoginContainer;
